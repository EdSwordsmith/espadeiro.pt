{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    djlint
    cargo
    rustc
    rustfmt
    clippy
    tailwindcss
    openssl
    pkg-config
    wrangler
  ];
}
