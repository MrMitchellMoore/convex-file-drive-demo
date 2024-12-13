import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { getUser } from "./users";

export const createFile = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("You must be signed in to create a file");
    }

    const user = await getUser(ctx, identity.tokenIdentifier);

    if (!user) {
      throw new ConvexError("no user with this token found");
    }

    if (
      !user.orgIds.some((org) => org.orgId === args.orgId) &&
      user.tokenIdentifier !== identity.tokenIdentifier
    ) {
      throw new ConvexError(
        "You are not authorized to create a file in this organization"
      );
    }

    await ctx.db.insert("files", {
      name: args.name,
      orgId: args.orgId,
    });
  },
});

export const getFiles = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }
    return await ctx.db
      .query("files")
      .withIndex("by_org_id", (q) => q.eq("orgId", args.orgId))
      .collect();
  },
});
