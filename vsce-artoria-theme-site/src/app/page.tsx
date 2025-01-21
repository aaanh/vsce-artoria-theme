export default function Home() {
  return (
    <main className="mx-auto p-8 max-w-4xl min-h-screen">
      <h1 className="mb-8 font-bold text-4xl">Castoria Theme Downloads</h1>

      <div className="gap-6 grid">
        <DownloadCard
          title="Visual Studio Code"
          description="Artoria Theme for VS Code"
          link="https://marketplace.visualstudio.com/items?itemName=aaanh.artoria-theme"
          icon="vscode"
        />

        <DownloadCard
          title="iTerm2"
          description="Castoria Dark theme for iTerm2"
          link="/downloads/castoria_dark.itermcolors"
          icon="iterm"
        />

        <DownloadCard
          title="Vim"
          description="Castoria Dark theme for Vim"
          link="/downloads/castoria_dark.vim"
          icon="vim"
        />

        <DownloadCard
          title="Windows Terminal"
          description="Castoria Dark theme for Windows Terminal"
          link="/downloads/castoria_dark.win_terminal.jsonc"
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

function DownloadCard({ title, link, icon }: DownloadCardProps) {
  return (
    <a
      href={link}
      className="block border-white/10 bg-white/5 hover:bg-white/10 p-6 border rounded-lg transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center bg-white/10 rounded-lg w-12 h-12">
          {/* You can replace this with actual icons later */}
          <span className="text-2xl">{icon[0].toUpperCase()}</span>
        </div>
        <div>
          <h2 className="font-semibold text-xl">{title}</h2>
          {/* <p className="text-gray-400">{description}</p> */}
        </div>
      </div>
    </a>
  );
}
