enum HttpMethod {
    GET = "GET",
    // POST = "POST",
    // PUT = "PUT",
    // DELETE = "DELETE",
}

export class HttpError {
    code: number
    message: string

    constructor(code = 500, message = "Something went wrong") {
        this.code = code
        this.message = message
    }
}

export const API_BASE_URL = "https://api.github.com/"


class Http {
    private readonly baseUrl: string

    constructor(apiUrl?: string) {
        this.baseUrl = apiUrl || API_BASE_URL
    }

    async get<T = any>(url: string, params?: object): Promise<Promise<T> | HttpError> {
        const urlSearchParams = params
            ? `?${new URLSearchParams(params as any).toString()}`
            : ""

        try {
            const response = await fetch(`${this.baseUrl}${url}${urlSearchParams}`, {
                method: HttpMethod.GET,
                headers:{
                    "Accept": "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                    "Content-Type": "application/json",
                }
            })

            if (!response.ok) return new HttpError()

            return await response.json();
        } catch (e) {
            return new HttpError()
        }
    }

    // async post<T = any>(url: string, data?: unknown): Promise<Promise<T> | HttpError> {
    //     try {
    //         const response = await fetch(`${this.baseUrl}/${url}`, {
    //             method: HttpMethod.POST,
    //             headers:{
    //                 "Accept": "application/vnd.github+json",
    //                 "X-GitHub-Api-Version": "2022-11-28",
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(data),
    //         })
    //         return responce.json()
    //     } catch (e) {
    //         return new HttpError()
    //     }
    // }
}

export const http = new Http()
