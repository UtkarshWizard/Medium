import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { updatePostInput , createPostInput } from "@utkarshiitm/medium-common";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

type Variables = {
  userId: string;
};

export const blogRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

//in hono this is one way to do middleware. any req coming to /something/* will need to pass
//to this and when next is called then proceed.

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];

  try {
    const response = await verify(token, c.env.JWT_SECRET);

    if (response.id) {
      //@ts-ignore
      c.set("userId", response.id);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "Wrong Credentials" });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body)
  const userId = c.get("userId");

  if (!success) {
    c.status(403)
    return c.json({error: "Invalid Inputs"})
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({ id: post.id });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Unable to post blog" });
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);

  if (!success) {
    c.status(403)
    return c.json({error: "Invalid Inputs"})
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ id: post.id });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Unable to update blog" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findMany({
      take: 10,
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name:true
          }
        }
      }
    });

    return c.json({ post });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Unable to post blog" });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    return c.json({ post });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Unable to post blog" });
  }
});
