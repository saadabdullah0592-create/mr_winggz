import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const CONTACT_NUMBERS = [
  { label: 'Home Delivery', number: '0311-1500555' },
  { label: 'UAN', number: '041-111-500-555' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative bg-black py-20 md:py-28">
      <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-red-700/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="font-body text-sm font-medium uppercase tracking-widest text-red-500">
            Get In Touch
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            ORDER NOW OR <span className="text-red-600">REACH OUT</span>
          </h2>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Phone cards */}
          {CONTACT_NUMBERS.map((contact) => (
            <a
              key={contact.number}
              href={`tel:${contact.number.replace(/-/g, '')}`}
              className="card-hover group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-8 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-950/40 ring-1 ring-red-600/30 transition-all group-hover:bg-red-600">
                <Phone className="h-6 w-6 text-red-500 group-hover:text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  {contact.label}
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-white">
                  {contact.number}
                </p>
              </div>
            </a>
          ))}

          {/* Hours card */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-950/40 ring-1 ring-red-600/30">
              <Clock className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Open Daily
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-white">
                12 PM – 1 AM
              </p>
            </div>
          </div>
        </div>

        {/* Info strip */}
        <div className="mt-8 flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-center md:flex-row md:gap-10 md:text-left">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-red-500" />
            <span className="text-sm text-gray-300">
              Faisalabad · Sargodha · Islamabad
            </span>
          </div>
          <div className="hidden h-8 w-px bg-white/10 md:block" />
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-red-500" />
            <span className="text-sm text-gray-300">
              Home delivery available — call to order
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
