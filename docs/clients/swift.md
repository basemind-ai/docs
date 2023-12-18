---
sidebar_position: 2
sidebar_label: Apple Platforms
slug: /clients/swift
---

# Apple Platforms Client

The BaseMind [Swift client library](https://github.com/basemind-ai/sdk-ios) supports the following
Apple platforms:

-   iOS >= v13.0
-   macOS >= v12.0
-   macCatalyst >= v13.0

## Installation

Add the sdk in your `Package.swift` file dependencies:

```swift
    dependencies: [
        .package(url: "https://github.com/basemind-ai/sdk-ios.git", from: "1.0.0"),
    ]
```

Then add the dependency to a target:

```swift
    targets: [
        .target(
            name: "MyApp",
            dependencies: ["BaseMindClient"]
        ),
    ]
```

## Usage

Before using the client you have to initialize it. The init function requires an `apiKey` that you can create using the
BaseMind platform (visit https://basemind.ai):

```swift
import BaseMindClient

let client = BaseMindClient(apiKey: "<MyApiKey>")
```

Once the client is initialized, you can use it to interact with the AI model(s) you configured in the BaseMind
dashboard.

### Prompt Request/Response

You can request an LLM prompt using the `requestPrompt` method, which expects a dictionary of string key/value pairs -
correlating with any template variables defined in the dashboard (if any):

```swift
import BaseMindClient

let client = BaseMindClient(apiKey: "<MyApiKey>")

func handlePromptRequest(userInput: String) async throws -> String {
    let templateVariables = ["userInput": userInput]

    let response = try client.requestPrompt(templateVariables)

    return response.content
}
```

### Prompt Streaming

You can also stream a prompt response using the `requestStream` method:

```swift
import BaseMindClient

let client = BaseMindClient(apiKey: "<MyApiKey>")

func handlePromptStream(userInput: String) async throws -> [String] {
    let templateVariables = ["userInput": userInput]

    let stream = try client.requestStream(templateVariables)

    var chunks: [String] = []

    for try await response in stream {
        chunks.append(response.content)
    }

    return chunks
}
```

Similarly to the `requestPrompt` method, `requestStream` expects a dictionary of strings (if any template variables
are defined in the dashboard).

It returns a data container that is both an AsyncSequence and an AsyncIterator. You can therefore loop and iterate
through the results as fits your use case.

### Error Handling

All errors thrown by the client are instances of `BaseMindError`. Errors are thrown in the following cases:

1. The api key is empty (`BaseMindError.missingToken`).
2. A server side or connectivity error occurred (`BaseMindError.serverError`)
3. A required template variable was not provided in the dictionary of the request (`BaseMindError.invalidArgument`).
4. The task containing streaming is cancelled (`BaseMindError.cancelled`).

### Options

You can pass an options struct to the client:

```swift
import BaseMindClient
import OSLog

let options = ClientOptions(
    debug: true,
    host: "127.0.0.1",
    logger: Logger(subsystem: "my-sub-system", category: "client"),
    port: 443,
    promptConfigId: "c5f5d1fd-d25d-4ba2-b103-8c85f48a679d"
)

let client = BaseMindClient(apiKey: "<MyApiKey>", options: options)
```

-   `debug`: if set to true (default false) the client will log debug messages.
-   `host`: the host of the BaseMind Gateway server to use.
-   `logger`: an OSLog.Logger instance. If provided it will override the default logger used.
-   `port`: the server port.
-   `promptConfigId`: the ID of the prompt config to use. If given this value will be used by the server.

**Note**: you can have multiple client instances with different `promptConfigId` values set. This allows you to use
multiple model configurations within a single application.
