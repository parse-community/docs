# Files

## The ParseFile

`ParseFile` allows you to store large files (images, documents, videos, etc.) in the cloud, which would be impractical to store directly within a `ParseObject`.

**Creating a `ParseFile`:**

You need the file data as a `byte[]` or a `Stream`.  You also provide a filename (including the extension).

```csharp
// Example 1: From a byte array
byte[] data = System.Text.Encoding.UTF8.GetBytes("Working at Parse is great!");
ParseFile file = new ParseFile("resume.txt", data);

// Example 2: From a Stream (e.g., a file stream)
using (FileStream stream = File.OpenRead("path/to/your/file.png"))
{
    ParseFile fileFromStream = new ParseFile("image.png", stream);
    await fileFromStream.SaveAsync(); // Save immediately, or later.
}

// Example 3: From a Stream with a known content type (recommended)
using (FileStream stream = File.OpenRead("path/to/your/file.pdf"))
{
   ParseFile fileFromStream = new ParseFile("document.pdf", stream, "application/pdf");
   await fileFromStream.SaveAsync();
}
```

**Important Notes:**

*   **Unique Identifiers:**  Parse handles filename collisions.  Each uploaded file gets a unique identifier. You *can* upload multiple files with the same name.
*   **File Extension:**  The filename *must* include the correct file extension (e.g., `.txt`, `.png`, `.jpg`, `.pdf`). This allows Parse to determine the file type and handle it appropriately (e.g., serving images with the correct `Content-Type` header).
* **Content Type (Optional but Recommended):** When creating a `ParseFile` from a `Stream`, you can *optionally* provide the content type (MIME type) as a third argument (e.g., "image/png", "application/pdf", "text/plain").  This is *highly recommended* as it ensures the file is served correctly. If you don't provide it, Parse will try to infer it from the filename extension, but providing it explicitly is more reliable. If creating from a `byte[]`, content type is inferred from file name.

**Saving a `ParseFile`:**

```csharp
await file.SaveAsync();
```

You *must* save the `ParseFile` to Parse *before* you can associate it with a `ParseObject`.  The `SaveAsync()` method uploads the file data to the Parse Server.

**Associating a `ParseFile` with a `ParseObject`:**

```csharp
var jobApplication = new ParseObject("JobApplication");
jobApplication["applicantName"] = "Joe Smith";
jobApplication["applicantResumeFile"] = file; // Assign the saved ParseFile
await jobApplication.SaveAsync();
```

**Retrieving a `ParseFile`:**

You retrieve the `ParseFile` object itself from the `ParseObject`, and then you can access its URL to download the file data.

```csharp
// Assuming you have a jobApplication object:
ParseFile? applicantResumeFile = jobApplication.Get<ParseFile>("applicantResumeFile");

if (applicantResumeFile != null)
{
    // Option 1: Get the file data as a byte array (for smaller files)
     byte[] fileData = await applicantResumeFile.GetBytesAsync();

    // Option 2: Download the file using HttpClient (more versatile)
    using (HttpClient client = new HttpClient())
    {
        // As a byte array:
        byte[] downloadedData = await client.GetByteArrayAsync(applicantResumeFile.Url);

        // As a string (if it's text):
         string resumeText = await client.GetStringAsync(applicantResumeFile.Url);

        // To a Stream (for larger files, or to save directly to disk):
        using (Stream fileStream = await client.GetStreamAsync(applicantResumeFile.Url))
        {
            // Process the stream (e.g., save to a file)
            using (FileStream outputStream = File.Create("downloaded_resume.txt"))
            {
                await fileStream.CopyToAsync(outputStream);
            }
        }
    }
    // Option 3: Get the file data as a Stream (for larger files)
    using (Stream dataStream = await applicantResumeFile.GetDataStreamAsync())
    {
        // Use dataStream to read file content.
        // Example: If it is a text file, you may want to use StreamReader:
        using (StreamReader reader = new StreamReader(dataStream))
        {
            string fileContent = await reader.ReadToEndAsync();
            // Process the file content.
        }
    }
}
```

**Important Considerations for Retrieval:**

*   **`Get<ParseFile>()`:**  You retrieve the `ParseFile` *object* itself using `Get<ParseFile>()`.  This object contains metadata like the URL, filename, and content type.  It does *not* contain the file *data* itself.
*   **`Url` Property:**  The `ParseFile.Url` property provides the publicly accessible URL where the file data can be downloaded.
*   **`HttpClient`:**  The recommended way to download the file data is to use `HttpClient`.  This gives you the most flexibility (handling different file types, large files, etc.).
*   **`GetBytesAsync()`, `GetDataStreamAsync()`:** `ParseFile` provides convenient methods `GetBytesAsync()` and `GetDataStreamAsync()` to download data.
* **Stream Management:** Always wrap Stream and `HttpClient` in using statements, to release resources.

## Progress Reporting

Track upload progress using the `IProgress<ParseUploadProgressEventArgs>` interface:

```csharp
byte[] data = System.Text.Encoding.UTF8.GetBytes("Working at Parse is great!");
ParseFile file = new ParseFile("resume.txt", data);

var progress = new Progress<ParseUploadProgressEventArgs>(args =>
{
    Console.WriteLine($"Upload Progress: {args.Progress}%");
    // You could also update a UI element here (e.g., a progress bar)
    // *but* make sure to dispatch UI updates to the main thread if needed:
    // MainThread.BeginInvokeOnMainThread(() => { ... });
});

await file.SaveAsync(progress);
```

**Key Points about Progress:**

*   **`IProgress<ParseUploadProgressEventArgs>`:**  This interface provides a standard way to report progress.
*   **`ParseUploadProgressEventArgs`:**  This class (part of the Parse SDK) provides the progress information (percentage).
*   **UI Updates:** If you update UI elements from the progress handler, you *must* do so on the main thread (using `MainThread.BeginInvokeOnMainThread` in MAUI).  Network operations and progress handlers typically run on background threads.

## Deleting Files

*Files can be deleted from your server, freeing storage space.*

*   **Referenced Files:** You can delete files that are *referenced* by objects using the REST API (requires the master key). *This SDK does not provide a direct method for deleting files via the client.* The documentation you provided links to the REST API documentation for this.

*   **Unreferenced Files:**  Files that are *not* referenced by any object in your app *cannot* be deleted via the REST API. You can request a cleanup of unused files in your app's Settings page (on the Parse Server dashboard).  *Be careful*:  Deleting unreferenced files might break functionality if your app relies on accessing them directly via their URL.  Only files *currently* associated with an object are protected from this cleanup.

**Important Security Note:** File deletion via the REST API requires the *master key*.  The master key should *never* be included in client-side code. File deletion should be handled by server-side logic (e.g., Cloud Code) or through the Parse Server dashboard.