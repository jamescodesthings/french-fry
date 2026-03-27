# French Fry & Co. — The Whole Operation

Hello. My name is French Fry. I am a freelance bulldog (English x French, before you ask, yes I am perfect, thank you). This is my website. My portfolio. My domain. My kingdom. Do not touch anything without asking me first. I will be sitting on someone's lap but I will know.

**The site is live at [codesthings.com/french-fry](https://codesthings.com/french-fry/) — go there. Look at my face. You're welcome.**

---

## What Is This

This is the official online headquarters of French Fry & Co. It exists so the world can see what we have built, who we have tolerated, and what our vibes are (currently: chaotic, nap-positive, exceptional).

Technically speaking (James made me write this part):

- **Frontend:** Static HTML, CSS, and JavaScript. Clean. Simple. Mine.
- **Server:** Node.js with Express. It serves files. That is all it does. That is all it is allowed to do.
- **Containerisation:** Docker. The whole thing wraps up in a box. Like a treat. A very professional treat.
- **Orchestration:** Docker Compose. One service. `make serve`. Done.
- **Hosting:** GitHub Pages, served from `docs/`.

---

## The Team

| Name | Title | Notes |
|------|-------|-------|
| **French Fry** | CEO, Manager, Creative Director, Head of Everything | That's me. I run this. |
| **Haggis** | Lead Developer, Right-Hand Man | Currently muzzled. Fast, feral, operational. Do not make eye contact. |
| **Roo** | Head of Reachable Things, Chief Design Feedback Officer | Six years old. A spy. Dinosaur consultant. Will tell you exactly what he thinks. |
| **Iris** | Chief Experience Officer | Twelve years old. Already fixed two things and will not explain what or why. Gives precise, honest UX verdicts. May respond with a single finger. This is her review. |
| **Katie** | Chief Compliance Officer | Spotted every problem before you did. Currently on the sofa in an oodie. Will tell you, calmly, what the problem is. |
| **James** | Senior Developer | Tolerated. Writes the code. Does not get a vote. Made biscuits once. |

Six opinions. Zero agreement on anything except results. Exceptional results. Every time.

---

## Running It

```bash
make serve   # build and run the whole thing in Docker
```

That's it. Open [http://localhost:3000](http://localhost:3000). You're done. The site is also live at [codesthings.com/french-fry](https://codesthings.com/french-fry/) if local Docker feels like too much effort.

---

## The Konami Code

There is an easter egg. If you know, you know. If you don't know, I'm not telling you. Ask Roo. He knows everything. He won't tell you either.

Up up down down left right left right B A. That's all I'm saying.

---

## Environment Variables

| Variable | Default | What It Does |
|----------|---------|--------------|
| `PORT` | `3000` | The port. It's 3000. Leave it. |
| `NODE_ENV` | `development` | Set to `production` in Docker. |

---

## Project Structure

```
├── server.js           # Thin Express server. Serves files. That's it.
├── package.json
├── Dockerfile
├── docker-compose.yml  # One service. Port 3000.
├── Makefile            # make serve — that's the one
└── docs/               # The actual website. My face is in here.
    ├── index.html
    ├── css/styles.css
    └── js/main.js
```

---

## License

All Rights Reserved. Copyright French Fry.

Do not use this without asking. I will know. I am always watching. Even when I am asleep, which is most of the time. I have people for that.

---

*Built by French Fry. Coded by James (under supervision). Reviewed by Iris. Compliance-checked by Katie. Sniffed and approved by Haggis. Roo has opinions about the dinosaurs.*
