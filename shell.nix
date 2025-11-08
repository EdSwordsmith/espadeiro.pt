{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    djlint
    cargo
    rustc
    rustfmt
    clippy
    tailwindcss_4
    openssl
    pkg-config
    wrangler
  ];
}
