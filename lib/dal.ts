import { cookies } from "next/headers"
import { cache } from "react"
import { dcrypt } from "./session"
import { db } from "@/prisma/db"

export type AccessType = {
    email: string
    phone: string
    profileImage: string
}

export const getAuthSession = cache(
    async ()=> {
        const cookieStore = await cookies()
        const sessionData = cookieStore.get("session")?.value
        const session = await dcrypt(sessionData)
        if (!session) {
            return null
        }
       const sessionId = session.userId as string
       const user = await db.user.findUnique({
        where : {
            id : sessionId
        },
        select:{
            email: true,
            phone: true,
            profileImage: true
        }
       })
       return user as AccessType
    }
)