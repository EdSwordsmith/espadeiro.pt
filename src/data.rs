use serde::Serialize;

pub const BASE_URL: &str = "https://espadeiro.pt";

pub const LIKES: &[&str] = &[
    "Programming languages and Compilers",
    "Linux (and NixOS)",
    "Rust",
    "Functional Programming",
    "Heavy Metal",
    "Brewing mead",
];

#[derive(Serialize)]
pub struct Project {
    desc: &'static str,
    href: &'static str,
}

pub const PROJECTS: &[Project] = &[
    Project {
        desc: "a brainfuck compiler",
        href: "https://github.com/EdSwordsmith/brainfuck",
    },
    Project {
        desc: "another brainfuck compiler",
        href: "https://github.com/EdSwordsmith/brainfuck.rs",
    },
    Project {
        desc: "my journey through crafting interpreters",
        href: "https://github.com/EdSwordsmith/crafting_interpreters",
    },
    Project {
        desc: "a turing machine simulator",
        href: "https://github.com/Espadeiro-Salvador/emulador-maquinas-turing",
    },
    Project {
        desc: "a metaobject protocol for julia",
        href: "https://github.com/EdSwordsmith/Liberalitas.jl",
    },
    Project {
        desc: "a custom static site generator",
        href: "https://github.com/EdSwordsmith/espadeiro.pt",
    },
];

#[derive(Serialize)]
pub struct Job {
    from: &'static str,
    to: &'static str,
    position: &'static str,
    company: &'static str,
}

pub const JOBS: &[Job] = &[
    Job {
        from: "November 2025",
        to: "Present",
        position: "Systems Engineer",
        company: "Cloudflare",
    },
    Job {
        from: "January 2025",
        to: "July 2025",
        position: "SRE",
        company: "freiheit.com",
    },
    Job {
        from: "May 2023",
        to: "November 2024",
        position: "Research Intern",
        company: "INESC-ID",
    },
    Job {
        from: "Sep 2022",
        to: "Aug 2024",
        position: "Teaching Assistant",
        company: "Computer Science Department (IST)",
    },
    Job {
        from: "May 2021",
        to: "May 2024",
        position: "Full Stack Developer",
        company: "Computer Science Department (IST)",
    },
];
