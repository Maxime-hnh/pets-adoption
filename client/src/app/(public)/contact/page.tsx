import { HeartHandshake, MapPinIcon } from "lucide-react";
import ContactForm from "./ContactForm";
import { Button } from "@/_components/ui/button";

export default function ContactPage() {

  const addressContent = (
    <>
      <h2 className="text-2xl font-fredoka font-[700] mb-4">Où nous trouver ?</h2>
      <div className="flex gap-2 items-center mb-1">
        <MapPinIcon className="w-4 h-4 text-gray-500" />
        <p className="text-xs md:text-md text-gray-500">Route de Saint-Manvieu-Norrey, 14790 VERSON</p>
      </div>
      <div className="w-full h-[200px] md:h-[300px] rounded-xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.304556211199!2d-0.4829757959198738!3d49.17255980663466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480a45602ef51ec1%3A0x66f4bf61f229acfd!2sSPA%20de%20Basse-Normandie%20(Verson)!5e1!3m2!1sfr!2sfr!4v1752084358421!5m2!1sfr!2sfr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  )

  return (
    <section className="flex flex-col gap-6 min-h-[100dvh] px-4 xl:px-8 2xl:px-12">

      {/* Header */}
      <div className="flex flex-col gap-6 bg-emerald-500 py-5 md:pb-10 px-4 w-full sm:pt-[110px] rounded-b-[3rem]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-fredoka font-[700] text-center text-white">
          <span className="sr-only">Contactez-nous !</span>
          Écrivez-nous, on vous répond vite !
        </h1>
        <p className="text-white text-center">
          Vous avez des questions, des suggestions ou des idées ? Nous sommes là pour vous aider.
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col-reverse pb-10 gap-12 lg:px-6 xl:px-42 2xl:px-63 3xl:px-78 md:gap-8 md:flex-row md:justify-center">

        {/* Left */}
        <div className="flex flex-col gap-12">
          {/* Address */}
          <div>
            {addressContent}
          </div>

          {/* Donation */}
          <div className="flex flex-col gap-4 bg-white py-4 px-6 rounded-2xl shadow-2xl border border-gray-300 lg:w-[450px]">
            <h3 className="font-fredoka font-[700] text-lg">
              Contribuez à notre mission
            </h3>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>

            <div className="w-full flex justify-center">
              <Button className="bg-emerald-500"><HeartHandshake className="w-4 h-4" /> Donation</Button>
            </div>
          </div>
        </div>


        {/* Right */}
        <div className="flex gap-8 md:min-w-1/2 lg:justify-end">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}