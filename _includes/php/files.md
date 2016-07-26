# Files

## Creating a ParseFile

`ParseFile` lets you store application files in the cloud that would otherwise be too large or cumbersome to fit into a regular `ParseObject`. The most common use case is storing images, but you can also use it for documents, videos, music, and any other binary data (up to 10 megabytes).

Getting started with `ParseFile` is easy. There are a couple of ways to create a file. The first is to provide the contents of the file.

<pre><code class="php">
$contents = "Hello World.";
$file = ParseFile::createFromData($contents, "myfile.txt");
</code></pre>

Alternatively, you can create a file from the contents of a local file:

<pre><code class="php">
$localFilePath = "/tmp/myFile.txt";
$file = ParseFile::createFromFile($localFilePath, "myfile.txt");
</code></pre>

Notice in this example that we give the file a name of `myfile.txt`. There's two things to note here: 

*   You don't need to worry about filename collisions. Each upload gets a unique identifier so there's no problem with uploading multiple files named `photo.jpg`.
*   It's important that you give a name to the file that has a file extension. This lets Parse figure out the file type and handle it accordingly. So, if you're storing PNG images, make sure your filename ends with `.png`.

Next you'll want to save the file up to the cloud. As with `ParseObject`, the `save` method is the way to go.

<pre><code class="php">
$file->save();
// The file has been saved to Parse and now has a URL.
$url = $file->getURL();
</code></pre>

Finally, after the save completes, you can associate a `ParseFile` with a `ParseObject` just like any other piece of data:

<pre><code class="php">
$jobApplication = new ParseObject("JobApplication");
$jobApplication->set("applicantName", "Joe Smith");
$jobApplication->set("applicantResumeFile", $file);
$jobApplication->save();
</code></pre>

## Retrieving File Contents

How to best retrieve the file contents back depends on the context of your application. It's best if you can make the visitors browser do the work for you. Typically, that means rendering the file's URL into your output. Here we output an uploaded profile photo in an image tag:

<pre><code class="php">
$profilePhoto = $profile->get("photoFile");
echo '<img src="' . $profilePhoto->getURL() . '">';
</code></pre>

If you want to fetch the contents of the file, you can retrieve it like this:

<pre><code class="php">
$contents = $file->getData();
</code></pre>
