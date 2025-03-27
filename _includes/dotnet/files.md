# Files

## ParseFile

`ParseFile` allows you to store large files like images, documents, or videos in the cloud, which would be impractical to store directly within a `ParseObject`.

### Creating a `ParseFile`

You need to provide the file data as a `byte[]` or a `Stream`, and provide a filename. The filename must include the correct file extension (e.g. `.txt`). This allows Parse Server to determine the file type and handle it appropriately, for example to later serve the file with the correct `Content-Type` header.

To create a file from a byte array:

```csharp
byte[] data = System.Text.Encoding.UTF8.GetBytes("Working at Parse is great!");
ParseFile file = new ParseFile("resume.txt", data);
```

To create a file from a stream:

```csharp
using (FileStream stream = File.OpenRead("path/to/your/file.png"))
{
    ParseFile fileFromStream = new ParseFile("image.png", stream);
    await fileFromStream.SaveAsync();
}
```

When creating a `ParseFile` from a `Stream`, you can optionally provide the content type (MIME type) as a third argument (e.g., `image/png`, `application/pdf`, `text/plain`).  This is recommended as it ensures the file is later served correctly. Without it, Parse Server will try to infer it from various file properties, but providing it explicitly is more reliable.

To create a file from a stream and provide a content type:

```csharp
using (FileStream stream = File.OpenRead("path/to/your/file.pdf"))
{
   ParseFile fileFromStream = new ParseFile("document.pdf", stream, "application/pdf");
   await fileFromStream.SaveAsync();
}
```

#### Important Considerations

- Parse handles filename collisions. Each uploaded file gets a unique identifier. This allows you to upload multiple files with the same name.

### Saving a `ParseFile`

```csharp
await file.SaveAsync();
```

You must save the `ParseFile` to Parse before you can associate it with a `ParseObject`. The `SaveAsync()` method uploads the file data to the Parse Server.

### Associating `ParseFile` with `ParseObject`

```csharp
var jobApplication = new ParseObject("JobApplication");
jobApplication["applicantName"] = "Joe Smith";
jobApplication["applicantResumeFile"] = file;
await jobApplication.SaveAsync();
```

### Retrieving a `ParseFile`

You retrieve the `ParseFile` object using `Get<ParseFile>()`. This object contains metadata like the URL, filename, and content type. It does not contain the file data itself. The `ParseFile.Url` property provides the publicly accessible URL where the file data can be downloaded.

The recommended way to download the file data is to use `HttpClient`. This gives you the most flexibility (handling different file types, large files, etc.). `ParseFile` provides convenient methods `GetBytesAsync()` and `GetDataStreamAsync()` to download data. Always wrap Stream and `HttpClient` in `using` statements to ensure releasing the resources.

The following example shows various ways to download the file data:

```csharp
ParseFile? applicantResumeFile = jobApplication.Get<ParseFile>("applicantResumeFile");

if (applicantResumeFile != null)
{
    Download the file using HttpClient (more versatile)
    using (HttpClient client = new HttpClient())
    {
        // As a byte array
        byte[] downloadedData = await client.GetByteArrayAsync(applicantResumeFile.Url);

        // As a string (if it's text)
        string resumeText = await client.GetStringAsync(applicantResumeFile.Url);

        // To a Stream (for larger files, or to save directly to disk)
        using (Stream fileStream = await client.GetStreamAsync(applicantResumeFile.Url))
        {
            // Process the stream (e.g., save to a file)
            using (FileStream outputStream = File.Create("downloaded_resume.txt"))
            {
                await fileStream.CopyToAsync(outputStream);
            }
        }
    }
}
```

## Progress Reporting

*Work In Progress*

## Deleting a `ParseFile`

A Parse File is just a reference to a file source inside a Parse Object. Deleting this reference from a Parse Object will not delete the referenced file source as well.

When deleting a reference, you usually want to delete the file source as well, otherwise your data storage is increasingly occupied by file data that is not being used anymore. Without any reference, Parse Server won't be aware of the file's existence.

For that reason, it's an important consideration what do to with the file source *before* you remove its reference.

This SDK currently does not provide a method for deleting files. See the REST API documentation for how to delete a file.

**Important Security Note:** File deletion via the REST API requires the master key. The master key should never be included in client-side code. File deletion should therefore be handled by server-side logic via Cloud Code.
