import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LucideProps,
  Github,
  Briefcase,
  Target,
  MessageSquare,
  Layers,
  FolderCode,
  Check,
  X,
} from "lucide-react";
import { getDynamicIcon } from "@/lib/icons";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import React from "react";

const DynamicIconRenderer = ({
  name,
  ...props
}: { name: string } & LucideProps) => {
  const LucideIcon = getDynamicIcon(name);
  return React.createElement(LucideIcon, props);
};

const Icon = (props: { name: string } & LucideProps) => (
  <DynamicIconRenderer {...props} />
);

const ComparisonTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | boolean)[][];
}) => (
  <div className="my-8 overflow-hidden rounded-xl border shadow-sm">
    <Table>
      <TableHeader>
        <TableRow className="bg-secondary/30">
          {headers.map((header, i) => (
            <TableHead key={i} className="text-foreground font-bold">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {row.map((cell, j) => (
              <TableCell key={j} className="text-muted-foreground font-medium">
                {typeof cell === "boolean" ? (
                  cell ? (
                    <Check className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )
                ) : (
                  cell
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

// Map for badge variants since our UI badge is limited
const BADGE_VARIANT_MAP: Record<string, string> = {
  danger: "bg-red-500/10 text-red-500 border-red-500/20",
  warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  info: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary text-secondary-foreground border-transparent",
  outline: "bg-transparent text-foreground border-border",
};

const BioHero = ({
  experience,
  focus,
  tagline,
  labels,
}: {
  experience: string;
  focus: string;
  tagline: string;
  labels: {
    experience: string;
    years: string;
    focus: string;
  };
}) => (
  <Card className="bg-secondary/30 border-secondary/50 my-8">
    <CardContent className="pt-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary rounded-lg p-2">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <div className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              {labels.experience}
            </div>
            <div className="font-serif text-lg">
              {experience} {labels.years}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 text-primary rounded-lg p-2">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <div className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              {labels.focus}
            </div>
            <div className="text-sm leading-tight font-medium text-balance">
              {focus}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="border-secondary/50 border-t pt-4">
      <div className="text-primary flex items-center gap-2 font-medium italic">
        <MessageSquare className="h-4 w-4" />
        <span className="text-sm">{tagline}</span>
      </div>
    </CardFooter>
  </Card>
);

const TechSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="my-8 space-y-4">
    <div className="text-foreground flex items-center gap-2 font-bold tracking-tight">
      <Layers className="text-primary h-4 w-4" />
      <h3>{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const ProjectCard = ({
  title,
  repo,
  description,
  tech,
}: {
  title: string;
  repo: string;
  description: string;
  tech: string[];
}) => (
  <Card className="group hover:border-primary/50 my-6 transition-all duration-300 hover:shadow-md">
    <CardHeader>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground rounded-lg p-2 transition-colors">
            <FolderCode className="h-5 w-5" />
          </div>
          <CardTitle className="font-serif text-xl">{title}</CardTitle>
        </div>
        <Link
          href={`https://github.com/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-secondary text-muted-foreground hover:text-primary rounded-full p-2 transition-all"
        >
          <Github className="h-5 w-5" />
        </Link>
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-sm leading-relaxed">
        {description}
      </CardDescription>
    </CardContent>
    <CardFooter>
      <div className="flex flex-wrap gap-1.5">
        {tech.map((t) => (
          <Badge
            key={t}
            variant="secondary"
            className="text-muted-foreground bg-secondary/50 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase"
          >
            {t}
          </Badge>
        ))}
      </div>
    </CardFooter>
  </Card>
);

export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <TypographyH1 {...props} className={cn("mt-8 scroll-m-20", className)} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <TypographyH2
      {...props}
      className={cn("mt-12 mb-6 scroll-m-20 border-b pb-2", className)}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <TypographyH3
      {...props}
      className={cn("mt-10 mb-5 scroll-m-20", className)}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <TypographyH4 {...props} className={cn("mt-8 mb-4", className)} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <TypographyP
      {...props}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    />
  ),
  Badge: ({
    className,
    variant,
    ...props
  }: {
    className?: string;
    variant?: string;
  } & React.HTMLAttributes<HTMLSpanElement>) => {
    const variantClass = variant
      ? BADGE_VARIANT_MAP[variant]
      : BADGE_VARIANT_MAP.secondary;
    return (
      <Badge
        {...props}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
          variantClass,
          className
        )}
      />
    );
  },
  Highlight: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <span
      className={cn(
        "bg-primary/10 text-primary rounded px-1.5 py-0.5 font-medium",
        className
      )}
    >
      {children}
    </span>
  ),
  Callout: ({
    type = "default",
    title,
    children,
  }: {
    type?: "default" | "destructive" | "warning" | "success" | "info";
    title?: string;
    children: React.ReactNode;
  }) => {
    let variant: "default" | "destructive" = "default";
    let iconName = "info";
    let customClass = "";

    if (type === "destructive" || (type as string) === "danger") {
      variant = "destructive";
      iconName = "alert-octagon";
    } else if (type === "warning") {
      iconName = "alert-triangle";
      customClass =
        "border-amber-500/50 text-amber-600 dark:text-amber-500 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-500";
    } else if (type === "success") {
      iconName = "check-circle";
      customClass =
        "border-emerald-500/50 text-emerald-600 dark:text-emerald-500 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-500";
    }

    const IconComponent = getDynamicIcon(iconName);

    return (
      <Alert variant={variant} className={cn("my-6", customClass)}>
        <IconComponent className="h-4 w-4" />
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    );
  },
  Step: ({
    number,
    title,
    children,
  }: {
    number: string | number;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="my-8 flex gap-4">
      <div className="bg-primary/10 text-primary border-primary/20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-bold">
        {number}
      </div>
      <div className="space-y-2">
        <h4 className="leading-tight font-bold">{title}</h4>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  ),
  Icon,
  Hero: BioHero,
  TechSection,
  ProjectCard,
  ComparisonTable,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
};
