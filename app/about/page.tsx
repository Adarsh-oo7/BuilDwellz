import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, Users, Clock, ThumbsUp } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About BuilDwellz</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a premier design and construction company dedicated to creating beautiful, functional spaces.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              <p className="text-lg mb-6">
                BuilDwellz was founded with a vision to transform the construction and design industry in Varkala. We
                started as a small team of passionate architects and builders who believed in creating spaces that not
                only look beautiful but also enhance the quality of life for those who inhabit them.
              </p>
              <p className="text-lg mb-6">
                Over the years, we have grown into a full-service design and construction company, handling projects of
                all sizes and complexities. Our commitment to quality, innovation, and client satisfaction has made us
                one of the most trusted names in the industry.
              </p>
              <p className="text-lg mb-8">
                Today, we continue to push the boundaries of design and construction, incorporating sustainable
                practices, modern technologies, and traditional wisdom to create spaces that stand the test of time.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary rounded-tl-lg z-0"></div>
              <Image
                src="/project-3.jpg"
                alt="BuilDwellz team"
                width={600}
                height={400}
                className="rounded-lg shadow-xl relative z-10 w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-br-lg z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do and help us deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in every aspect of our work, from design to execution.
              </p>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-md text-center">
              <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Collaboration</h3>
              <p className="text-muted-foreground">
                We believe in working closely with our clients to understand and fulfill their vision.
              </p>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Timeliness</h3>
              <p className="text-muted-foreground">
                We respect deadlines and ensure timely completion of projects without compromising on quality.
              </p>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-md text-center">
              <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <ThumbsUp className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Integrity</h3>
              <p className="text-muted-foreground">
                We conduct our business with honesty, transparency, and ethical practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our talented team of professionals is dedicated to bringing your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                position: "Principal Architect",
                bio: "With over 15 years of experience in architectural design, John leads our design team with creativity and precision.",
                image: "/team-1.jpg",
              },
              {
                name: "Jane Smith",
                position: "Interior Designer",
                bio: "Jane specializes in creating beautiful, functional interiors that reflect the unique personality and lifestyle of our clients.",
                image: "/team-2.jpg",
              },
              {
                name: "Michael Johnson",
                position: "Construction Manager",
                bio: "Michael oversees all construction projects, ensuring quality workmanship and adherence to timelines and budgets.",
                image: "/team-3.jpg",
              },
            ].map((member, index) => (
              <div key={index} className="bg-background rounded-lg overflow-hidden shadow-md">
                <div className="relative h-80">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary mb-4">{member.position}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose BuilDwellz</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We offer a unique combination of expertise, quality, and personalized service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-secondary">Expertise & Experience</h3>
              <p className="text-gray-300 mb-6">
                Our team consists of experienced professionals with expertise in various aspects of design and
                construction.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Qualified architects and designers
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Skilled craftsmen and builders
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Project managers with years of experience
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-secondary">Quality & Attention to Detail</h3>
              <p className="text-gray-300 mb-6">
                We are committed to delivering high-quality work with meticulous attention to detail.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Premium materials and finishes
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Rigorous quality control processes
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Attention to every detail, no matter how small
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-secondary">Personalized Service</h3>
              <p className="text-gray-300 mb-6">
                We believe in providing personalized service tailored to each client's unique needs and preferences.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  One-on-one consultations
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Customized design solutions
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Regular updates and communication
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-secondary">Comprehensive Services</h3>
              <p className="text-gray-300 mb-6">
                We offer a wide range of services to meet all your design and construction needs.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Architectural design and planning
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Interior design and decoration
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Construction and project management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to schedule a consultation and bring your dream home to life.
          </p>
          <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
