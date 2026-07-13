# Getting Started

The Parse platform provides a complete backend solution for your mobile application. Our goal is to totally eliminate the need for writing server code or maintaining servers.

If you're familiar with web frameworks like ASP.NET MVC we've taken many of the same principles and applied them to our platform. In particular, our SDK is ready to use out of the box with minimal configuration on your part.

<div class='tip info'><div>
  This guide is for the .NET-based version of our SDK.  It is designed for .NET MAUI applications.
</div></div>

If you haven't installed the SDK yet, please head over to the QuickStart guide to get our SDK up and running in Visual Studio. Note that our SDK targets .NET 9 applications, including .NET MAUI.  
With .NET 9 and MAUI, your Parse-powered app can now seamlessly run across a vast range of platforms, from Windows PCs and Android TVs to Wear OS devices and beyond – truly maximizing your reach with a single codebase! This unified approach simplifies development and lets you target more users than ever before. You can also check out our API Reference for more detailed information about our SDK.

Parse's .NET SDK makes heavy use of the [Task-based Asynchronous Pattern](http://msdn.microsoft.com/en-us/library/hh873175.aspx) so that your apps remain responsive. You can use the `async` and `await` keywords in C# to easily use these long-running tasks.


# Initializing the Parse .NET SDK for MAUI

This section explains how to initialize the Parse .NET SDK within your .NET MAUI application.  Proper initialization connects your app to your Parse Server and enables you to use Parse's features.

**Recommended Approach (MAUI Entry Point)**

The recommended way to initialize the Parse Client is within your MAUI application's entry point, specifically in the `App.xaml.cs` file's constructor. This ensures Parse is ready to go as soon as your app starts.

**1. Add the `using` directive:**

   At the top of your `App.xaml.cs` file, add the following line to import the necessary Parse namespace:

   ```csharp
   using Parse;
   using Parse.Infrastructure; // For ServerConnectionData
   ```

**2. Create the `InitializeParseClient` method:**

   This method handles the initialization logic, including checking for an internet connection and validating your API keys.  It's good practice to encapsulate this logic in a separate method.

   ```csharp
   public static bool InitializeParseClient()
   {
       try
       {
           // Check for internet connection
           if (Connectivity.NetworkAccess != NetworkAccess.Internet)
           {
               Console.WriteLine("No Internet Connection: Unable to initialize ParseClient.");
               return false;
           }

           // Validate API Keys (Replace placeholders with your actual keys)
           if (string.IsNullOrEmpty("PUT_IN_YOUR_SERVERURI_HERE") || 
               string.IsNullOrEmpty("PUT_IN_YOUR_APP_ID_HERE") ||
               string.IsNullOrEmpty("PUT_IN_YOUR_DOTNET_KEY_HERE"))
               //You can use your Master Key instead of DOTNET but beware as it is the...Master Key
           {
               Console.WriteLine("Invalid API Keys: Unable to initialize ParseClient.");
               return false;
           }

           // Create ParseClient using ServerConnectionData
           ParseClient client = new ParseClient(new ServerConnectionData
           {
               ApplicationID = APIKeys.ApplicationId,
               ServerURI = APIKeys.ServerUri,
               Key = APIKeys.DotNetKEY, //Or MasterKey
           });

           // Make the client instance globally accessible
           client.Publicize();

           Debug.WriteLine("ParseClient initialized successfully.");
           return true;
       }
       catch (Exception ex)
       {
           Console.WriteLine($"Error initializing ParseClient: {ex.Message}");
           return false;
       }
   }
   ```

**3. Call `InitializeParseClient` in your App's constructor:**

   Inside your `App` class constructor in `App.xaml.cs`, call the `InitializeParseClient` method:

   ```csharp
   public App()
   {
       InitializeComponent();

       MainPage = new AppShell();

       // Initialize Parse Client
       if (!InitializeParseClient())
       {
           // Handle initialization failure (e.g., show an error message)
           // Consider preventing the app from continuing if Parse is essential
           Console.WriteLine("Failed to initialize Parse.  Check your keys and internet connection.");
       }
   }
   ```


**Alternative `ParseClient` Initialization (Less Common)**

While the `ServerConnectionData` approach is recommended for clarity and flexibility, you can also initialize `ParseClient` directly with the keys:

```csharp
// Less recommended, but still valid
ParseClient client = new ParseClient("Your Application ID", "The Parse Server Instance Host URI", "Your .NET Key");
client.Publicize();
```

**Common Definitions:**

*   **Application ID:** Your app's `ApplicationId` from your Parse Server dashboard.
*   **Key:** Your app's `.NET Key` from your Parse Server dashboard.
*   **Master Key:** Your app's `Master Key` from your Parse Server dashboard. Using this key bypasses client-side permissions (CLPs and ACLs). Use with caution.
*   **Server URI:** The full URL to your Parse Server (e.g., `https://yourserver.com/parse`).

**Advanced: Server-Side Use (Concurrent Users)**

The SDK also supports scenarios where you need to handle multiple concurrent users, each with their own authentication.  This is more advanced and typically used in server-side applications, not directly within a MAUI app (which usually handles a single user at a time).

```csharp
// For server-side scenarios with concurrent users (rarely needed in MAUI)
new ParseClient(/* Parameters */, default, new ConcurrentUserServiceHubCloner { }).Publicize();

// Subsequent clients for different users
ParseClient client = new ParseClient { };
```

This uses the `ConcurrentUserServiceHubCloner` to ensure each `ParseClient` instance has its own user context.  Unless you are building a server-side component that interacts with Parse on behalf of multiple users *simultaneously*, you likely won't need this.
