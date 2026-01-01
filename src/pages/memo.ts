import { memo } from "react"
const Name=memo(function Name(name:any) {
    console.log(name.name)
    return `Hello, ${name.name}`
})
export default Name