type FrameSource = "application" | "dependency" | "node-internal" | "native" | "unknown";

export interface StackFrame {
    functionName: string;
    location: string;
    source: FrameSource;
}

export interface FormattedStackTrace {
    error: string;
    frames: StackFrame[];
    totalFrames: number;
    truncated: boolean;
}

interface FormatStackTraceOptions {
    maxFrames?: number;
    appRoot?: string;
}

const STACK_LINE_REGEX = /^at\s+(?:(.+?)\s+\()?(.+?)\)?$/;

const normalizePath = (value: string): string => value.replaceAll("\\", "/");

const classifyFrameSource = (location: string): FrameSource => {
    if (location === "native") {
        return "native";
    }

    if (location.startsWith("node:")) {
        return "node-internal";
    }

    if (location.includes("/node_modules/") || location.includes(".pnpm/")) {
        return "dependency";
    }

    if (location.includes(":")) {
        return "application";
    }

    return "unknown";
};

const redactAppRoot = (location: string, appRoot: string): string => {
    const normalizedLocation = normalizePath(location);
    const normalizedRoot = normalizePath(appRoot).replace(/\/+$/, "");

    if (!normalizedRoot || !normalizedLocation.startsWith(normalizedRoot)) {
        return normalizedLocation;
    }

    return normalizedLocation.replace(normalizedRoot, "<app>");
};

const parseFrame = (line: string, appRoot: string): StackFrame => {
    const normalized = normalizePath(line.trim());
    const match = normalized.match(STACK_LINE_REGEX);

    if (!match) {
        return {
            functionName: "unknown",
            location: normalized,
            source: "unknown",
        };
    }

    const functionName = match[1]?.trim() || "anonymous";
    const location = redactAppRoot(match[2]?.trim() || "unknown", appRoot);

    return {
        functionName,
        location,
        source: classifyFrameSource(location),
    };
};

export const formatStackTrace = (
    stack?: string,
    options: FormatStackTraceOptions = {},
): FormattedStackTrace | undefined => {
    if (!stack) {
        return undefined;
    }

    const lines = stack
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length === 0) {
        return undefined;
    }

    const maxFrames = Math.max(1, Math.min(options.maxFrames ?? 15, 100));
    const appRoot = options.appRoot ?? process.cwd();
    const [errorLine, ...rawFrames] = lines;
    const stackFrames = rawFrames
        .filter((line) => line.startsWith("at "))
        .map((line) => parseFrame(line, appRoot));

    const truncated = stackFrames.length > maxFrames;

    return {
        error: errorLine ?? "Error",
        frames: stackFrames.slice(0, maxFrames),
        totalFrames: stackFrames.length,
        truncated,
    };
};
