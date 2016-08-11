# Analytics

Parse provides a number of hooks for you to get a glimpse into the ticking heart of your app. We understand that it's important to understand what your app is doing, how frequently, and when.

While this section will cover different ways to instrument your app to best take advantage of Parse's analytics backend, developers using Parse to store and retrieve data can already take advantage of metrics on Parse.

Without having to implement any client-side logic, you can view real-time graphs and breakdowns (by device type, Parse class name, or REST verb) of your API Requests in your app's dashboard and save these graph filters to quickly access just the data you're interested in.

The current server time will be used for all analytics requests. To explicitly set the time associated with a given event, an optional `at` parameter can be provided in ISO 8601 format.

````json
-d '{
    "at": {
      "__type": "Date",
      "iso": "2015-03-01T15:59:11-07:00"
    }
  }
````

## App-Open Analytics

Our analytics hook allows you to track your application being launched. By making a POST request to our REST API, you'll begin to collect data on when and how often your application is opened.

In the example below, the `at` parameter is optional. If omitted, the current server time will be used instead.

````bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
      }' \
  https://api.parse.com/1/events/AppOpened
````
````python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/events/AppOpened', json.dumps({
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
````

Graphs and breakdowns of your statistics are accessible from your app's Dashboard.


## Custom Analytics

Parse Analytics also allows you to track free-form events, with a handful of string keys and values. These extra dimensions allow segmentation of your custom events via your app's Dashboard.

Say your app offers search functionality for apartment listings, and you want to track how often the feature is used, with some additional metadata.

````bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
        "dimensions": {
          "priceRange": "1000-1500",
          "source": "craigslist",
          "dayType": "weekday"
        }
      }' \
  https://api.parse.com/1/events/Search
````
````python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/events/Search', json.dumps({
       "dimensions": {
         "priceRange": "1000-1500",
         "source": "craigslist",
         "dayType": "weekday"
       }
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
````

Parse Analytics can even be used as a lightweight error tracker — simply invoke the following and you'll have access to an overview of the rate and frequency of errors, broken down by error code, in your application:

````bash
curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
        "dimensions": {
          "code": "404"
        }
      }' \
  https://api.parse.com/1/events/Error
````
````python
import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/events/Error', json.dumps({
       "dimensions": {
         "code": "404"
       }
     }), {
       "X-Parse-Application-Id": "${APPLICATION_ID}",
       "X-Parse-REST-API-Key": "${REST_API_KEY}",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result
````

Note that Parse currently only stores the first eight dimension pairs per call to `/1/events/<eventName>`.
