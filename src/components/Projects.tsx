import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Folder, ExternalLink, Github as GithubIcon } from "lucide-react";

const projects = [
	{
		title: "E-Commerce Platform",
		description:
			"Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, shopping cart, and payment processing.",
		image: "/api/placeholder/400/250",
		technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
		liveUrl: "#",
		githubUrl: "#",
		featured: true,
	},
	{
		title: "Task Management App",
		description:
			"Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
		image: "/api/placeholder/400/250",
		technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io"],
		liveUrl: "#",
		githubUrl: "#",
		featured: true,
	},
	{
		title: "Weather Dashboard",
		description:
			"Beautiful weather dashboard with location-based forecasts, interactive charts, and weather alerts using OpenWeatherMap API.",
		image: "/api/placeholder/400/250",
		technologies: ["React", "Chart.js", "OpenWeather API", "Tailwind CSS"],
		liveUrl: "#",
		githubUrl: "#",
		featured: false,
	},
	{
		title: "Social Media Analytics",
		description:
			"Analytics dashboard for social media metrics with data visualization, trend analysis, and automated reporting features.",
		image: "/api/placeholder/400/250",
		technologies: ["Vue.js", "Python", "FastAPI", "D3.js", "PostgreSQL"],
		liveUrl: "#",
		githubUrl: "#",
		featured: false,
	},
	{
		title: "Real Estate Platform",
		description:
			"Modern real estate platform with property listings, virtual tours, mortgage calculator, and agent management system.",
		image: "/api/placeholder/400/250",
		technologies: ["React", "Express.js", "MongoDB", "Mapbox", "Cloudinary"],
		liveUrl: "#",
		githubUrl: "#",
		featured: false,
	},
	{
		title: "Learning Management System",
		description:
			"Comprehensive LMS with course creation, student enrollment, progress tracking, and interactive video lessons.",
		image: "/api/placeholder/400/250",
		technologies: ["Next.js", "Supabase", "Stripe", "Video.js", "Tailwind CSS"],
		liveUrl: "#",
		githubUrl: "#",
		featured: false,
	},
];

export function Projects() {
	const featuredProjects = projects.filter((project) => project.featured);
	const otherProjects = projects.filter((project) => !project.featured);

	return (
		<section id="projects" className="py-20 scroll-mt-24 md:scroll-mt-28">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<Badge variant="outline" className="mb-4">
						<Folder className="w-3 h-3 mr-2" />
						My Work
					</Badge>
					<h2 className="text-3xl sm:text-4xl font-bold mb-6">
						Featured Projects
					</h2>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
						Here are some of my recent projects that showcase my skills and
						experience in full-stack development, UI/UX design, and problem-solving.
					</p>
				</motion.div>

				{/* Featured Projects */}
				<div className="grid gap-8 md:grid-cols-2 mb-20">
					{featuredProjects.map((project, index) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<Card className="border-0 shadow-lg h-full">
								<CardHeader className="pb-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Folder className="w-5 h-5 text-primary" />
											<CardTitle className="text-xl">
												{project.title}
											</CardTitle>
										</div>
										<div className="flex items-center gap-2">
											{project.githubUrl && (
												<a
													href={project.githubUrl}
													target="_blank"
													className="text-muted-foreground hover:text-primary"
													aria-label="GitHub"
												>
													<GithubIcon className="w-4 h-4" />
												</a>
											)}
											{project.liveUrl && (
												<a
													href={project.liveUrl}
													target="_blank"
													className="text-muted-foreground hover:text-primary"
													aria-label="Live"
												>
													<ExternalLink className="w-4 h-4" />
												</a>
											)}
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-1">
										{project.technologies.map((tech) => (
											<Badge
												key={tech}
												variant="outline"
												className="text-xs"
											>
												{tech}
											</Badge>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>

				{/* Other Projects */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<h3 className="text-2xl font-bold text-center mb-12">
						Other Projects
					</h3>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{otherProjects.map((project) => (
							<Card key={project.title} className="border-0 shadow-md h-full">
								<CardHeader className="pb-3">
									<CardTitle className="text-lg">{project.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-1">
										{project.technologies.map((tech) => (
											<Badge
												key={tech}
												variant="outline"
												className="text-xs"
											>
												{tech}
											</Badge>
										))}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
