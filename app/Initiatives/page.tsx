import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function InitiativesPage() {
    const initiatives = [
        {
            title: "Supporting Local Schools",
            description: "At BuilDwellz, we believe that building a better future starts with supporting the foundations of education. As part of our community initiatives, we regularly contribute essential items to local schools in and around Varkala.",
            image: "/assets/Initiatives/IMG-20250627-WA0007.jpg",
        },
        {
            title: "Celebrating Learning: School Year Fest Support",
            description: "At BuilDwellz, we don’t just build homes — we build joy, connection, and community. One of our proudest initiatives is supporting School Year Fest programs in local schools.",
            image: "/assets/Initiatives/WhatsApp Image 2025-06-25 at 05.13.55_9a24f0eb.jpg",
        },
        {
            title: "Celebrating Together: Festivals with Our Clients",
            description: "One of our heartfelt initiatives is organizing festival celebrations such as Christmas, Onam, Vishu, and many more with our clients. These occasions allow us to go beyond business and connect on a personal level, culture, and traditions that make each festival unique.",
            image: "/assets/Initiatives/IMG-20250627-WA0004.jpg",
        },
    ]

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-muted text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Initiatives</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        At BuilDwellz, we believe in building more than structures — we build futures, communities, and sustainable systems.
                    </p>
                </div>
            </section>

            {/* Initiatives Grid */}
            <section className="py-20 bg-muted/40">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-1000">
                        {initiatives.map((item, idx) => (
                            <div
                                key={idx}
                                className="group [transform-style:preserve-3d] hover:[transform:rotateY(8deg)_rotateX(8deg)] transition-transform duration-500"
                            >
                                <div className="bg-background rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition duration-500 w-full h-[500px] flex flex-col">
                                    <div className="relative h-64">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-1 overflow-hidden">
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground overflow-hidden text-ellipsis">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* CTA Section */}
            <section className="py-20 bg-primary text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Partner With Us</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Join us in making a meaningful impact through sustainable design and responsible construction.
                    </p>
                    <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                        <Link href="/contact">Get in Touch</Link>
                    </Button>
                </div>
            </section>
        </>
    )
}
