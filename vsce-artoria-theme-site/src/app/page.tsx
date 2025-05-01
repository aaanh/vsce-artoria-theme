"use client";

import Image from "next/image";
import { useState } from "react";

const screenshots = [
  "castoria.png",
  "screenshot-1.png",
  "screenshot-2.png",
  "screenshot-3.png",
];

export default function Home() {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <main className="mx-auto p-8 max-w-4xl min-h-screen">
      <header className="mb-12">
        <h1 className="mb-4 font-bold text-4xl">Castoria Theme</h1>
        <p className="mb-4 text-gray-400 text-xl">
          A modern, elegant theme inspired by Fate/Grand Order&apos;s Caster
          Artoria
        </p>
        <div className="flex gap-4">
          <a className="link" href="https://github.com/aaanh">
            @aaanh
          </a>
          <a
            className="link"
            href="https://github.com/aaanh/vsce-artoria-theme"
          >
            Github
          </a>
          <a className="link" href="https://aaanh.com">
            Homepage
          </a>
        </div>
        <br />
        <nav className="flex gap-2">
          <a className="btn" href="#showcase">
            Showcase
          </a>
          <a className="btn" href="#features">
            Features
          </a>
          <a className="btn" href="#downloads">
            Downloads
          </a>
        </nav>
      </header>

      <section className="mb-12">
        <h2 className="mb-6 font-semibold text-2xl" id="showcase">
          Showcase
        </h2>
        <div className="gap-6 grid grid-cols-1">
          {screenshots.map((screenshot) => (
            <Image
              alt="screenshot of theme"
              width={800}
              height={500}
              key={screenshot}
              src={`/screenshots/${screenshot}`}
              className={`cursor-pointer transition-all ease-in-out ${
                expandedImage === screenshot ? "scale-150" : ""
              }`}
              onClick={() =>
                setExpandedImage(
                  expandedImage === screenshot ? null : screenshot
                )
              }
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-semibold text-2xl" id="features">
          Features
        </h2>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <FeatureCard
            title="Language Support"
            description="Enhanced syntax highlighting for TypeScript, JavaScript, Python, Rust, Shell scripts, and more"
          />
          <FeatureCard
            title="Math Support"
            description="Special highlighting for inline and block math in Markdown"
          />
          <FeatureCard
            title="Multiple Platforms"
            description="Available for VS Code, iTerm2, Vim, Windows Terminal, and Zed Editor"
          />
          <FeatureCard
            title="Active Development"
            description="Regular updates and improvements based on user feedback"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-6 font-semibold text-2xl" id="#downloads">
          Downloads
        </h2>
        <div className="gap-6 grid">
          <DownloadCard
            title="Visual Studio Code"
            description="Install from Code extensions or from the Marketplace"
            link="https://marketplace.visualstudio.com/items?itemName=aaanh.artoria-theme"
            icon="vscode"
          />
          <DownloadCard
            title="iTerm2"
            description="Import the color scheme"
            link="https://raw.githubusercontent.com/aaanh/vsce-artoria-theme/refs/heads/main/exported/castoria_dark.itermcolors"
            icon="iterm"
          />
          <DownloadCard
            title="Vim"
            description="Copy the file to ~/.vim/colors/ and add colorscheme castoria_dark to ~/.vimrc"
            link="https://raw.githubusercontent.com/aaanh/vsce-artoria-theme/refs/heads/main/exported/castoria_dark.vim"
            icon="vim"
          />
          <DownloadCard
            title="Windows Terminal"
            description="Open the JSON file and paste into the schemes array"
            link="https://raw.githubusercontent.com/aaanh/vsce-artoria-theme/refs/heads/main/exported/castoria_dark.win_terminal.jsonc"
            icon="terminal"
          />
          <DownloadCard
            title="Zed Editor"
            description={`Download and place the file in "~/.config/zed/themes". Then restart Zed`}
            link="https://raw.githubusercontent.com/aaanh/vsce-artoria-theme/refs/heads/main/exported/castoria-dark-zed.json"
            icon="terminal"
          />
        </div>
      </section>
    </main>
  );
}

interface DownloadCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

function DownloadCard({ title, description, link, icon }: DownloadCardProps) {
  return (
    <a
      href={link}
      className="block bg-white/5 hover:bg-white/10 p-6 border border-white/10 rounded-lg transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex justify-center items-center bg-white/10 rounded-lg w-12 h-12">
          <span className="text-2xl">{icon[0].toUpperCase()}</span>
        </div>
        <div>
          <h2 className="font-semibold text-xl">{title}</h2>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </a>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/5 p-4 rounded-lg">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
