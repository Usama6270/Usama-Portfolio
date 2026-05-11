import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Usama Jamshed — Full Stack MERN Developer & AI/ML Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Usama Jamshed — Software Engineering student at FAST NU. MERN stack, AI/ML, NLP, DevOps. Selected projects, experience and contact.",
      },
      { property: "og:title", content: "Usama Jamshed — Full Stack MERN Developer & AI/ML Engineer" },
      {
        property: "og:description",
        content:
          "Selected work in MERN, deep learning and product engineering by Usama Jamshed.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portfolio,
});
