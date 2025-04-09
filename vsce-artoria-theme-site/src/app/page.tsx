export default function Home() {
  return (
    <main className="mx-auto p-8 max-w-4xl min-h-screen">
      <h1 className="mb-8 font-bold text-4xl">Castoria Theme Downloads</h1>

      <p>
        By{" "}
        <a className="link" href="https://github.com/aaanh">
          @aaanh
        </a>{" "}
        |{" "}
        <a className="link" href="https://github.com/aaanh/vsce-artoria-theme">
          Github
        </a>{" "}
        |{" "}
        <a className="link" href="https://aaanh.com">
          Homepage
        </a>
      </p>
      <br />

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
