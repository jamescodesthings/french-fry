# French Fry — Management HQ & Personal Portfolio

Hello. My name is French Fry. I am a freelance bulldog (English x French, before you ask, yes I am perfect, thank you). This is my website. My portfolio. My domain. My kingdom. Do not touch anything without asking me first. I will be sitting on someone's lap but I will know.

---

## What Is This

This is my personal management headquarters and portfolio. It lives on the internet so that the world can see what I have built and who I have tolerated along the way.

Technically speaking (James made me write this part):

- **Frontend:** Static HTML, CSS, and JavaScript. Clean. Simple. Mine.
- **Server:** Node.js with Express. It serves files. That is all it does. That is all it is allowed to do.
- **Containerisation:** Docker. The whole thing wraps up in a box. Like a treat. A very professional treat.
- **Orchestration:** Docker Compose. One service. Port 3000. Done.
- **Dev tooling:** Make. Because I said so.

---

## The Team

| Name | Title | Notes |
|------|-------|-------|
| **French Fry** | CEO, Manager, Creative Director, Head of Everything | That's me. I run this. |
| **Haggis** | Right-Hand Man | Currently muzzled. It's temporary. Probably. |
| **Roo** | Head of Reachable Things | Also a spy. We don't talk about it. |
| **James** | Senior Developer | Tolerated. Writes the code. Does not get a vote. |

---

## Running It Locally (No Docker, If You Must)

```bash
make install   # get the node stuff
make dev       # start the server
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. That's it. You're welcome.

---

## Running It With Docker (The Correct Way)

```bash
make build    # build the container
make up       # start it in the background
```

Then open [http://localhost:3000](http://localhost:3000). To see what's happening:

```bash
make logs     # tail the logs
make down     # stop it when you're done
```

---

## Other Useful Commands

| Command | What It Does |
|---------|--------------|
| `make restart` | Restart the running container |
| `make clean` | Remove container and local image |
| `make shell` | Shell into the running container (advanced business) |
| `make lint` | Lint the JavaScript |

---

## The Konami Code

There is an easter egg. If you know, you know. If you don't know, I'm not telling you. Ask Roo. He knows everything. He won't tell you either.

Up up down down left right left right B A. That's all I'm saying. That's all anyone is saying.

---

## Environment Variables

| Variable | Default | What It Does |
|----------|---------|--------------|
| `PORT` | `3000` | The port. It's 3000. Leave it. |
| `NODE_ENV` | `development` | Set to `production` in Docker. |

---

## Project Structure

```
├── server.js           # Thin Express server. It serves files. That's it.
├── package.json        # Dependencies and scripts
├── Dockerfile          # Containerises the whole operation
├── docker-compose.yml  # One service. Port 3000. Done.
├── Makefile            # All the commands you need
└── public/             # The actual website. My face is in here.
    ├── index.html
    ├── css/styles.css
    └── js/main.js
```

---

## License

All Rights Reserved. Copyright French Fry.

Do not use this without asking. I will know. I am always watching. Even when I am asleep, which is most of the time. I have people for that. (Roo is one of them.)

---

*Built by French Fry. Coded by James (under supervision). Sniffed and approved by Haggis and Roo.*
