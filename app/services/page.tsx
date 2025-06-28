import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Ruler, Compass, FileText, PenTool, Building, FileCheck, Paintbrush } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      id: "building-plan",
      icon: <Ruler className="h-10 w-10" />,
      title: "Building Plan",
      description:
        "Our expert architects create detailed building plans tailored to your specific needs and preferences. We consider spatial requirements, functionality, aesthetics, and regulatory compliance to deliver plans that serve as a solid foundation for your construction project.",
      image: "https://savemax.in/blogs/wp-content/uploads/2024/03/Building-Approval-Plans.jpg",
    },
    {
      id: "3d-design",
      icon: <Compass className="h-10 w-10" />,
      title: "3D Design",
      description:
        "Visualize your project before construction begins with our realistic 3D renderings. Our 3D designs help you understand spatial relationships, material choices, lighting effects, and overall aesthetics, allowing for adjustments before the actual construction phase.",
      image: "../s2.jpg",
    },
    {
      id: "vaasthu-consulting",
      icon: <Home className="h-10 w-10" />,
      title: "Vaasthu Consulting",
      description:
        "We incorporate traditional Vaasthu principles into modern architectural designs to create harmonious living spaces. Our Vaasthu consultants ensure proper orientation, room placement, and energy flow to promote positive energy and well-being in your home.",
      image: "../vasthu.jpg",
    },
    {
      id: "estimation",
      icon: <FileText className="h-10 w-10" />,
      title: "Estimation",
      description:
        "Get accurate cost estimates for your construction project. Our detailed estimation service covers material costs, labor expenses, equipment requirements, and other project-related expenditures, helping you plan your budget effectively.",
      image: "https://constructionreviewonline.com/knowhow/wp-content/uploads/2021/03/construction-estimations.jpg",
    },
    {
      id: "structural-designing",
      icon: <PenTool className="h-10 w-10" />,
      title: "Structural Designing",
      description:
        "Our structural engineers design safe, durable, and efficient structural systems for your building. We ensure that the structure can withstand various loads and environmental conditions while meeting all safety standards and building codes.",
      image: "https://assets.jswonemsme.com/cementconstruction6_1736774513258_cd6208a52f/cementconstruction6_1736774513258_cd6208a52f.jpeg",
    },
    {
      id: "building-construction",
      icon: <Building className="h-10 w-10" />,
      title: "Building Construction",
      description:
        "From foundation to finishing touches, we handle all aspects of building construction with precision and care. Our experienced construction team ensures quality workmanship, adherence to timelines, and attention to detail at every stage of the construction process.",
      image: "https://5.imimg.com/data5/SELLER/Default/2022/1/AJ/SW/HM/137254470/construction.jpg",
    },
    {
      id: "building-permit",
      icon: <FileCheck className="h-10 w-10" />,
      title: "Building Permit",
      description:
        "We assist you in obtaining all necessary building permits and approvals from local authorities. Our team handles the paperwork, documentation, and follow-ups required for regulatory compliance, ensuring a smooth and legal construction process.",
      image: "https://thumbs.dreamstime.com/b/buildings-permit-concept-residential-building-project-wooden-stamp-261360046.jpg",
    },
    {
      id: "interior-designing",
      icon: <Paintbrush className="h-10 w-10" />,
      title: "Interior Designing",
      description:
        "Transform your space with our comprehensive interior design services. From space planning and material selection to furniture arrangement and decor, our interior designers create functional, aesthetically pleasing interiors that reflect your personal style and enhance your quality of life.",
      image: "../s6.jpg",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer a comprehensive range of design and construction services to bring your vision to life.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center mb-6">
                    <div className="bg-primary/10 p-4 rounded-full mr-4 text-primary">{service.icon}</div>
                    <h2 className="text-3xl font-bold">{service.title}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-8">{service.description}</p>
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/contact">Enquire About This Service</Link>
                  </Button>
                </div>
                <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary rounded-tl-lg z-0"></div>
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl relative z-10 w-full h-[400px] object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-br-lg z-0"></div>
                </div>
              </div>
            ))}
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
