import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { User, Code2, Lightbulb, Target } from "lucide-react";

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
	"Node.js",
	"Next.js",
	"Python",
	"PostgreSQL",
	"MongoDB",
	"AWS",
	"Docker",
	"Git",
	"Figma",
];

export function About() {
	return (
		<section id="about" className="py-20 bg-muted/30">
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
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						With over 5 years of experience in full-stack development, I specialize in
						creating modern web applications that combine beautiful design with robust
						functionality. I'm passionate about learning new technologies and turning
						complex problems into simple, elegant solutions.
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
							<div className="aspect-square bg-gradient-to-br from-blue-100/50 to-blue-200/50 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 flex items-center justify-center">
								<div className="w-full h-full bg-background/50 backdrop-blur-sm rounded-xl border border-border flex items-center justify-center">
									<div className="text-center">
										<div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
											<User className="w-12 h-12 text-primary" />
										</div>
										<h3 className="text-2xl font-bold mb-2">
											Satya Pavan Jupudi
										</h3>
										<p className="text-muted-foreground">
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
								className="border-none shadow-none bg-background/50"
							>
								<CardContent className="p-6">
									<div className="flex items-start space-x-4">
										<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
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
