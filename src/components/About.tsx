import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { User, Code2, Lightbulb, Target, Briefcase } from "lucide-react";

const features = [
	{
		icon: Code2,
		title: "Clean Code",
		description:
			"Writing maintainable, scalable, and efficient code following best practices.",
	},
	{
		icon: Lightbulb,
		title: "Creative Solutions",
		description:
			"Innovative problem-solving approach to complex technical challenges.",
	},
	{
		icon: Target,
		title: "Goal-Oriented",
		description:
			"Focused on delivering results that exceed expectations and drive success.",
	},
];

const skills = [
	"JavaScript",
	"TypeScript",
	"React",
	"Tailwind CSS",
	"Shadcn/ui",
	"Better Auth UI",
	"Key Cloak",
	"Better Auth",
	"Electric SQL",
	"Express.js",
	"Node.js",
	"Nest.js",
	"PostgreSQL",
	"Docker",
	"Github",
	"Argo CD",
];

export function About() {
	return (
		<section id="about" className="py-20 bg-gradient-light dark:bg-muted/30">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<Badge variant="outline" className="mb-4">
						<User className="w-3 h-3 mr-2" />
						About Me
					</Badge>
					<h2 className="text-3xl sm:text-4xl font-bold mb-6">
						Passionate Developer & Problem Solver
					</h2>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-justify">
						A dedicated full-stack developer with 1 year of hands-on experience building dynamic web applications. I transform ideas into elegant, user-centric solutions by blending creative design with solid technical architecture. I thrive on solving challenging problems and continuously expanding my skillset with emerging technologies.
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<div className="relative">
							<div className="bg-gradient-to-br from-blue-50/80 to-blue-100/60 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl shadow-medium dark:shadow-none flex flex-col overflow-hidden min-h-[440px]">
								{/* Image Section */}
								<div className="w-full h-80 flex items-center justify-center bg-gradient-to-b from-muted/20 to-transparent overflow-hidden min-h-[330px]">
									<img 
										src="/src/assets/33516.png" 
										alt="Satya Pavan" 
										className="w-full h-auto object-cover mt-10"
									/>
								</div>
								{/* Name and Title Section */}
								<div className="text-center px-6 py-6 w-full border-t border-border/30">
									<div className="flex items-center justify-center gap-2 mb-3">
										<User className="w-5 h-5 text-primary" />
										<h3 className="text-2xl font-bold">
											Satya Pavan Jupudi
										</h3>
									</div>
									<div className="flex items-center justify-center gap-2">
										<Briefcase className="w-4 h-4 text-primary" />
										<p className="text-lg font-semibold text-muted-foreground">
											Full-Stack Developer
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="space-y-6"
					>
						{features.map((feature, index) => (
							<Card
								key={index}
								className="border border-border/40 shadow-soft dark:shadow-none bg-card/90 dark:bg-background/50 hover:shadow-medium dark:hover:shadow-none transition-all duration-300"
							>
								<CardContent className="p-6">
									<div className="flex items-start space-x-4">
										<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-soft dark:shadow-none">
											<feature.icon className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h4 className="text-xl font-semibold mb-2">
												{feature.title}
											</h4>
											<p className="text-muted-foreground">
												{feature.description}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center"
				>
					<h3 className="text-2xl font-bold mb-8">
						Technologies I Work With
					</h3>

					{/* Marquee container */}
					<div className="relative overflow-hidden">
						{/* edge fades */}
						<div
							aria-hidden
							className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-muted/30 to-transparent"
						/>
						<div
							aria-hidden
							className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-muted/30 to-transparent"
						/>

						{/* Single seamless track (duplicated items) */}
						<motion.div
							className="flex gap-3 whitespace-nowrap will-change-transform"
							initial={{ x: "0%" }}
							animate={{ x: "-50%" }}
							transition={{ duration: 30, ease: "linear", repeat: Infinity }}
						>
							{[...skills, ...skills].map((skill, index) => (
								<Badge
									key={`marquee-${skill}-${index}`}
									variant="secondary"
									className="px-4 py-2 text-sm font-medium"
									title={skill}
								>
									{skill}
								</Badge>
							))}
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
