import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
  try {
    console.log("Fetching current user...");
    const user = await currentUser();

    if (user) {
      console.log("User found, checking database...");
      const loggedInUser = await prisma.user.findUnique({
        where: { clerkUserId: user.id },
      });

      if (!loggedInUser) {
        console.log("User not found in database, creating new user...");
        await prisma.user.create({
          data: {
            name: user.fullName || "Unknown",
            clerkUserId: user.id,
            email: user.emailAddresses?.[0]?.emailAddress || "",
            imageUrl: user.imageUrl || "",
          },
        });
      }
    } else {
      console.log("No user logged in, allowing visitor access.");
    }

    return <div>{children}</div>;
  } catch (error) {
    console.error("Error in layout.tsx:", error);
    return <h1 style={{ color: "red" }}>Error loading layout. Check logs.</h1>;
  }
}
