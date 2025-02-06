import { Config } from "@netlify/functions"

export default async (req) => {
    const { next_run } = await req.json()


console.log(next_run)

// Your API connection code here
// For example:
const response = await fetch("https://https://pooapi.onrender.com")
const data = await response.json()
console.log(data)

}
export const Config = {
    schedule: "*/15 * * * *"
}
