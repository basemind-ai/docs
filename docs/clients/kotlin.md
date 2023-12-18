---
sidebar_position: 1
sidebar_label: Android
slug: /clients/kotlin
---

# Android Client

The BaseMind [Android client library](https://github.com/basemind-ai/sdk-android) is a Kotlin based library that can be
used in Android >= 25.0.

## Installation

Add the dependency in your application's `build.gradle.kts`:

```kotlin
dependencies {
    implementation("ai.basemind:client:1.0.0")
}
```

## Usage

Before using the client you have to initialize it. The init function requires an `apiKey` that you can create using the
BaseMind platform (visit https://basemind.ai):

```kotlin
import ai.basemind.client.BaseMindClient

val client = BaseMindClient.getInstance("<API_KEY")
```

Once the client is initialized, you can use it to interact with the AI model(s) you configured in the BaseMind dashboard.

### Prompt Request/Response

You can request an LLM prompt using the `requestPrompt` method, which expects a dictionary of string key/value pairs -
correlating with any template variables defined in the dashboard (if any):

```kotlin
import ai.basemind.client.BaseMindClient

val client = BaseMindClient.getInstance("<API_KEY")

fun handlePromptRequest(userInput: String): String {
    val map = mapOf("userInput" to userInput)
    val response = client.requestPrompt(map)

    return response.content
}
```

### Prompt Streaming

You can also stream a prompt response using the `requestStream` method:

```kotlin
import ai.basemind.client.BaseMindClient

val client = BaseMindClient.getInstance("<API_KEY")

fun handlePromptStream(userInput: String): MutableList<String> {
    val map = mapOf("userInput" to userInput)
    val response = client.requestStream(map)

    val chunks: MutableList<String> = mutableListOf()
    response.collect { chunk -> chunks.add(chunk.content) }

    return chunks
}
```

Similarly to the `requestPrompt` method, `requestStream` expects a mapping of strings (if any template variables are
defined in the dashboard).

### Error Handling

All errors thrown by the client are subclasses of `BaseMindException`. Errors are thrown in the following cases:

1. The api key is empty (`MissingAPIKeyException`).
2. A server side or connectivity error occurred (`APIGatewayException`).
3. A required template variable was not provided in the mapping passed to the request (`MissingPromptVariableException`).

### Options

You can pass an options object to the client:

```kotlin
import ai.basemind.client.BaseMindClient
import ai.basemind.client.Options

val options = Options(
    debug = true,
    debugLogger = { tag, message -> Log.i(tag, message)},
    serverAddress = "127.0.0.1",
    serverPort = 443,
    terminationDelaySeconds = 10L,
)

val client = BaseMindClient.getInstance("<API_KEY", options = options)
```

-   `debugLogger`: a function that receives a logging tag and a logging message and handles logging.
-   `debug`: if set to true (default false) the client will log debug messages.
-   `serverAddress`: the host of the BaseMind Gateway server to use.
-   `serverPort`: the server port.
-   `terminationDelaySeconds`: The amount of seconds a channel shutdown should wait before force terminating requests.

### Passing Prompt Config ID

The `BaseMindClient.getInstance` also accepts an optional `promptConfigId` parameter. This parameter is `null` by
default which means the client will use the prompt configuration defined as `default` in the dashboard.

You can also pass a specific prompt config ID to the client:

```kotlin
import ai.basemind.client.BaseMindClient

val client = BaseMindClient.getInstance("<API_KEY", promptConfigId = "c5f5d1fd-d25d-4ba2-b103-8c85f48a679d")
```

**Note**: you can have multiple client instances with different `promptConfigId` values set. This allows you to use
multiple model configurations within a single application.
