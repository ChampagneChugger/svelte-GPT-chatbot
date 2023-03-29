import type { Actions } from "./$types"

export const actions: Actions = {
    default: async ({ request, fetch }) => {
        const { pitanje } = Object.fromEntries(await request.formData())

        const response = await fetch("api/chatgpt", {
            method: "POST",
            body: JSON.stringify(pitanje)
        })

        const data = await response.json()

        return data
    }
}