## Custom Http

`custom-http` is **a lightweight package that imitates the core functionality of the http module**. It provides some essential classes and constants, making it easy to create HTTP servers and clients in your application.

### Installation ⬇️

```bash
npm i @kimyu0218/custom-http
```

### Classes 💫

#### HttpRequest
The `HttpRequest` class represents the request made by the client. It provides various methods to access information about the request.
```ts
import { HttpRequest } from '@kimyu0218/custom-http';
...
const req: HttpRequest = new HttpRequest(data);
const path: string = req.getPath();
const method: string = req.getMethod();
```
#### HttpResponse
The `HttpResponse` class represents the response that the server sends back to the client. It provides methods to set response headers and body.
```ts
import { HttpResponse } from '@kimyu0218/custom-http';
...
const res: HttpResponse = new HttpResponse(socket);
res.throwError(404).send();
```

### Constants 💫
#### METHODS
The `METHODS` is an object containing HTTP methods.
```ts
import { METHODS } from '@kimyu0218/custom-http';

console.log(METHODS.GET); // GET
```
#### STATUS_CODES
The `STATUS_CODES` is an object containing HTTP status codes and their respective messages.
```ts
import { STATUS_CODES } from '@kimyu0218/custom-http';

console.log(STATUS_CODES[200]); // OK
```
#### CONTENT_TYPE
The `CONTENT_TYPE` is an object representing different content types. Each content type corresponds to a specific file extension.
```ts
import { CONTENT_TYPE } from '@kimyu0218/custom-http';

console.log(CONTENT_TYPE.HTML); // text/html
```

### Ongoing Development 🏃

It's important to note that this project is **still in development**. If you find any issues or have suggestions for improvements, feel free to open an issue.
