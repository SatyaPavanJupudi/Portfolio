import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
	{
		title: "Software Developement Engineer - I",
		company: "M2P Solutions Private Limited",
		location: "Hyderabad, India",
		period: "2025 - Present",
		type: "Full-time",
		description:
			"Leading development of enterprise web applications using React, Node.js, and cloud technologies. Mentoring junior developers and driving technical architecture decisions.",
		achievements: [
			"Improved application performance by 40% through code optimization",
			"Led migration from legacy system to modern microservices architecture",
			"Mentored 5+ junior developers and conducted technical interviews",
			"Implemented CI/CD pipelines reducing deployment time by 60%",
		],
		technologies: [ "React","Node.js","Nest Js","TypeScript","Postgre SQL","Docker","Better Auth","Shadcn"],
	},
	{
		title: "Software Developement Engineer - I (Intern)",
		company: "M2P Solutions Private Limited",
		location: "Hyderabad, India",
		period: "2025",
		type: "Internship",
		duration: "3 months",
		description:
			"Developed scalable web applications and REST APIs for client projects. Collaborated with design and product teams to deliver high-quality solutions.",
		achievements: [
			"Built 15+ client projects from concept to deployment",
			"Reduced API response time by 50% through database optimization",
			"Introduced automated testing practices improving code quality",
			"Collaborated with UX team to improve user engagement by 35%",
		],
		technologies: ["React", "Express.js", "PostgreSQL", "Node.js", "Github"],
	},
	{
		title: "Programming and Cloud Computing Associate",
		company: "Google Developer Student Clubs, SVEC",
		location: "Tadepalligudem, India",
		period: "2023 - 2024",
		type: "Part-time",
		description:
			"Specialized in creating responsive and interactive user interfaces for various client websites and web applications.",
		achievements: [
			"Developed 20+ responsive websites with perfect mobile compatibility",
			"Improved website loading speed by 45% through optimization techniques",
			"Implemented modern build tools and development workflows",
			"Maintained 98% client satisfaction rate",
		],
		technologies: ["React", "JavaScript", "HTML5", "CSS3", "SQL"],
	},
];

export function Experience() {
	return (
		<section id="experience" className="py-20 scroll-mt-24 md:scroll-mt-28">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<Badge variant="outline" className="mb-4">
						<Briefcase className="w-3 h-3 mr-2" />
						Professional Journey
					</Badge>
					<h2 className="text-3xl sm:text-4xl font-bold mb-6">
						Work Experience
					</h2>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
						My professional journey in software development, showcasing growth,
						achievements, and the diverse range of projects I've worked on.
					</p>
				</motion.div>

				<div className="relative">
					{/* Timeline line */}
					<div className="absolute left-6 sm:left-8 md:left-1/2 md:-ml-0.5 top-0 bottom-0 w-0.5 bg-border" />

					<div className="space-y-12">
						{experiences.map((exp, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className={`relative flex items-center ${
									index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
								}`}
							>
								{/* Timeline dot */}
								<div className="absolute left-6 sm:left-8 md:left-1/2 md:-ml-3 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10" />

								{/* Content */}
								<div
									className={`flex-1 ml-16 sm:ml-20 md:ml-0 ${
										index % 2 === 0 ? "md:pr-8" : "md:pl-8"
									}`}
								>
									<Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900">
										<CardContent className="p-6">
											<div className="flex flex-wrap items-center gap-2 mb-3">
												<Badge variant="secondary" className="text-xs">
													{exp.type}
												</Badge>
												{exp.duration && (
													<Badge variant="outline" className="text-xs">
														{exp.duration}
													</Badge>
												)}
												<div className="flex items-center text-xs text-muted-foreground">
													<Calendar className="w-3 h-3 mr-1" />
													{exp.period}
												</div>
												<div className="flex items-center text-xs text-muted-foreground">
													<MapPin className="w-3 h-3 mr-1" />
													{exp.location}
												</div>
											</div>

											<h3 className="text-xl font-bold mb-1">
												{exp.title}
											</h3>
											<h4 className="text-lg text-primary font-semibold mb-3">
												{exp.company}
											</h4>

											<p className="text-muted-foreground mb-4 leading-relaxed">
												{exp.description}
											</p>

											<div className="mb-4">
												<h5 className="font-semibold mb-2 text-sm">
													Key Achievements:
												</h5>
												<ul className="space-y-1">
													{exp.achievements.map((achievement, i) => (
														<li
															key={i}
															className="text-sm text-muted-foreground flex items-start"
														>
															<span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
															{achievement}
														</li>
													))}
												</ul>
											</div>

											<div className="flex flex-wrap gap-1">
												{exp.technologies.map((tech) => (
													<Badge key={tech} variant="outline" className="text-xs">
														{tech}
													</Badge>
												))}
											</div>
										</CardContent>
									</Card>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
