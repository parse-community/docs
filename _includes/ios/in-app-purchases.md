# In-App Purchases

Parse provides a set of APIs for working with in-app purchases. Parse makes it easier to work with `StoreKit` and facilitates delivery of downloadable content with receipt verification in the cloud. Receipt verification is a mechanism that allows you to restrict downloads to only those users that have paid accordingly.

In addition, developers can attach query-able metadata on products to categorize, search, and dynamically manipulate products available for purchase.

Lastly, any content uploaded to Parse is exempt from the Apple review process, and hence can be served as soon as the upload is complete.

## Apple Setup

Prior to using in-app purchases on Parse, you'll need to set up your app and products with Apple. This process spans both the provisioning portal and iTunes Connect. We recommend following this [step-by-step guide](https://developer.apple.com/library/content/technotes/tn2259/_index.html).

Note that this is a tricky setup process so please ensure you follow Apple's documentation precisely.

## Simple Purchases

Once the setup above is complete, you can begin working with in-app purchases.

On the main thread, register the handlers for the products:
<div class="language-toggle" markdown="1">
```objective_c
// Use the product identifier from iTunes to register a handler.
[PFPurchase addObserverForProduct:@"Pro" block:^(SKPaymentTransaction *transaction) {
    // Write business logic that should run once this product is purchased.
    isPro = YES;
}];
```
```swift
// Use the product identifier from iTunes to register a handler.
PFPurchase.addObserverForProduct("Pro") {
    (transaction: SKPaymentTransaction?) -> Void in
    // Write business logic that should run once this product is purchased.
    isPro = YES;
}
```
</div>
Note that this does not make the purchase, but simply registers a block to be run if a purchase is made later. This registration must be done on the main thread, preferably as soon as the app is launched, i.e. in `application:didFinishLaunchingWithOptions:`. If there are multiple products, we recommend registering all product handlers in the same method, such as `application:didFinishLaunchingWithOptions`:

<div class="language-toggle" markdown="1">
```objective_c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    ...
    [PFPurchase addObserverForProduct:@"Pro" block:^(SKPaymentTransaction *transaction) {
        isPro = YES;
    }];
    [PFPurchase addObserverForProduct:@"VIP" block:^(SKPaymentTransaction *transaction) {
        isVip = YES;
    }];
}
```
```swift
PFPurchase.addObserverForProduct("Pro") {
    (transaction: SKPaymentTransaction?) -> Void in
    isPro = YES;
}
PFPurchase.addObserverForProduct("VIP") {
    (transaction: SKPaymentTransaction?) -> Void in
    isVip = YES;
}
```
</div>

To initiate a purchase, use the `+[PFPurchase buyProduct:block:]` method:
<div class="language-toggle" markdown="1">
```objective_c
[PFPurchase buyProduct:@"Pro" block:^(NSError *error) {
    if (!error) {
        // Run UI logic that informs user the product has been purchased, such as displaying an alert view.
    }
}];
```
```swift
PFPurchase.buyProduct("Pro") {
    (error: NSError?) -> Void in
    if error == nil {
        // Run UI logic that informs user the product has been purchased, such as displaying an alert view.
    }
}
```
</div>

The call to `buyProduct:block:` brings up a dialogue that asks users to enter their Apple credentials. When the user's identity is verified, the product will be purchased. If the product is non-consumable and has been purchased by the user before, the user will not be charged.

## Downloadable Purchases

Many IAP products such as books and movies have associated content files that should be downloaded once the purchase is made. This is very simple to do with Parse:

1.  First, go to the web data browser and create a `Product` class,
2.  For each product, fill in the required metadata information and upload the content files:
 1.  `productIdentifier:` the product identifier of the product, matching the one in iTunes Connect</code>
 2.  `icon:` the icon to be displayed in `PFProductTableViewController`
 3.  `title:` the title to be displayed in `PFProductTableViewController`
 4.  `subtitle:` the subtitle to be displayed in `PFProductTableViewController`
 5.  `order`: the order this product should appear in `PFProductTableViewController`. This is used only in `PFProductTableViewController`; fill in 0 if the order is not important,
 6.  `download`: the downloadable content file. Note that the file uploaded in `download` is not publicly accessible, and only becomes available for download when a purchase is made. `downloadName` is the name of the file on disk once downloaded. You don't need to fill this in.
3.  Next, you need to register the product handler:
<div class="language-toggle" markdown="1">
```objective_c
[PFPurchase addObserverForProduct:@"Pro" block:^(SKPaymentTransaction *transaction) {
    [PFPurchase downloadAssetForTransaction:transaction completion:^(NSString *filePath, NSError *error) {
        if (!error) {
            // at this point, the content file is available at filePath.
        }
    }];
}];
```
```swift
PFPurchase.addObserverForProduct("Pro") {
    (transaction: SKPaymentTransaction?) -> Void in
    if let transaction = transaction {
        PFPurchase.downloadAssetForTransaction(transaction) {
            (filePath: String?, error: NSError?) -> Void in
            if error == nil {
                // at this point, the content file is available at filePath.
            }
        }
    }
}
```
</div>
Note that this does not make the purchase, but simply registers a block to be run if a purchase is made later. The call to `downloadAssetForTransaction:completion:` passes the receipt of the purchase to the Parse Cloud, which then verifies with Apple that the purchase was made. Once the receipt is verified, the purchased file is downloaded.

To make the purchase:
<div class="language-toggle" markdown="1">
```objective_c
[PFPurchase buyProduct:@"Pro" block:^(NSError *error) {
    if (!error) {
        // run UI logic that informs user the product has been purchased, such as displaying an alert view.
    }
}];
```
```swift
PFPurchase.buyProduct("Pro") {(error: NSError?) -> Void in
    if error == nil {
        // run UI logic that informs user the product has been purchased, such as displaying an alert view.
    }
}
```
</div>

The call to `buyProduct:block:` brings up a dialogue that asks users to enter their Apple credentials. When the user's identity is verified, the product will be purchased.

## Querying Product Information

You can query the product objects created in the data browser using `PFProduct`. Like `PFUser` or `PFRole`, `PFProduct` is a subclass of `PFObject` that contains convenience accessors to various product-specific properties.

For example, here's a simple query to get a product:

<div class="language-toggle" markdown="1">
```objective_c
PFQuery *productQuery = [PFProduct query];
PFProduct *product = [[productQuery findObjects] lastObject];
NSLog(@"%@, %@", product.productIdentifier, product.title);
```
```swift
let productQuery = PFProduct.query()
if let product = productQuery.findObjects.lastObject as? PFProduct {}
  print(product.productIdentifier, product.title)
}
```
</div>

## PFProductTableViewController

<img data-echo="{{ site.baseUrl }}/assets/images/products_table_screenshot.png" style="max-width: 200px"/>

`PFProductTableViewController` is a subclass of `PFQueryTableViewController` that displays all IAP products in a table view. Some content apps, such as an app that sells comic books or video tutorials, may find it handy to use `PFProductTableViewController` to sell the products. By default, each cell is a product, and tapping on a cell initiates the purchase for the product. If the product has associated downloadable content, the download will start when the cell is selected and a progress bar is displayed to indicate the progress of the download.

Note that in order to use this class, you must enter all product information in the `Product` class via the data browser.
