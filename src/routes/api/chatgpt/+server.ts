import type { RequestHandler } from "./$types"
import { json } from "@sveltejs/kit"
import { Configuration, OpenAIApi } from "openai"

export const POST: RequestHandler = async ({ request, cookies }) => {
    const data = await request.json()

    const userkey = cookies.get("api_kljuc")

    if (userkey) {
        const openai = new OpenAIApi(
            new Configuration({
                apiKey: userkey
            })
        )

        const message = openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: data }]
        })

        const response = await message

        return json({
            content: response.data.choices[0].message?.content,
            role: response.data.choices[0].message?.role,
            id: response.data.id
        })
    } else {
        return json({
            greska: "Moraš unijeti svoj API ključ!"
        })
    }
}