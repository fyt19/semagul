"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
} from "lucide-react";
import { services } from "@/lib/constants";
import { getAvailableSlots, createAppointment } from "@/actions/appointments";
import { formatDateTR } from "@/lib/slots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookingCalendar,
  dateToIsoString,
} from "@/components/booking/BookingCalendar";
import { cn } from "@/lib/utils";

type BookingData = {
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes: string;
};

const STEPS = ["Hizmet", "Tarih & Saat", "Bilgiler", "Onay"];

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BookingData>({
    serviceId: "",
    serviceName: "",
    date: "",
    timeSlot: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const maxBookingDate = useMemo(
    () => new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000),
    [],
  );

  useEffect(() => {
    if (!data.date) {
      setSlots([]);
      setSlotsLoading(false);
      return;
    }

    let cancelled = false;
    setSlotsLoading(true);

    getAvailableSlots(data.date).then((available) => {
      if (!cancelled) {
        setSlots(available);
        setSlotsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [data.date]);

  const update = (partial: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
    setError(null);
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return !!data.serviceId;
      case 1:
        return !!data.date && !!data.timeSlot;
      case 2:
        return (
          data.firstName.length >= 2 &&
          data.lastName.length >= 2 &&
          data.phone.length >= 10 &&
          data.email.includes("@")
        );
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const result = await createAppointment(data);
    setLoading(false);

    if (result.success) {
      setReferenceId(result.data.referenceId);
      setStep(3);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-10 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  i <= step
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-400",
                )}
              >
                {i < step ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
              </div>
              <span className="mt-1.5 hidden text-xs font-medium text-slate-500 sm:block">
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1 transition-colors",
                  i < step ? "bg-teal-600" : "bg-slate-100",
                )}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              {step === 0 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-navy-900">
                    Hizmet Seçin
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Randevu almak istediğiniz tedavi alanını seçin.
                  </p>
                  <div className="mt-6 grid gap-3">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() =>
                          update({
                            serviceId: service.id,
                            serviceName: service.title,
                          })
                        }
                        className={cn(
                          "rounded-xl border p-4 text-left transition-all",
                          data.serviceId === service.id
                            ? "border-teal-400 bg-teal-50/50 ring-2 ring-teal-400/20"
                            : "border-slate-100 hover:border-teal-200",
                        )}
                      >
                        <p className="font-semibold text-navy-900">
                          {service.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                          {service.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-navy-900">
                    {"Tarih & Saat"}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Takvimden uygun bir gün seçin, ardından saat dilimini belirleyin.
                  </p>

                  <div className="mt-6 grid gap-8 lg:grid-cols-2">
                    <div>
                      <Label className="mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Tarih Seçin
                      </Label>
                      <BookingCalendar
                        selected={
                          data.date
                            ? new Date(data.date + "T12:00:00")
                            : undefined
                        }
                        maxDate={maxBookingDate}
                        onSelect={(date) => {
                          if (date) {
                            const iso = dateToIsoString(date);
                            update({ date: iso, timeSlot: "" });
                          } else {
                            update({ date: "", timeSlot: "" });
                          }
                        }}
                      />
                    </div>

                    <div>
                      <Label className="flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Saat Seçin
                      </Label>
                      {slotsLoading ? (
                        <p className="mt-3 text-sm text-slate-400">Yükleniyor...</p>
                      ) : !data.date ? (
                        <p className="mt-3 text-sm text-slate-400">
                          Önce bir tarih seçin.
                        </p>
                      ) : slots.length === 0 ? (
                        <p className="mt-3 text-sm text-amber-600">
                          Bu tarihte müsait saat bulunmuyor.
                        </p>
                      ) : (
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {slots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => update({ timeSlot: slot })}
                              className={cn(
                                "rounded-lg border py-2.5 text-sm font-medium transition-all",
                                data.timeSlot === slot
                                  ? "border-teal-400 bg-teal-50 text-teal-800"
                                  : "border-slate-100 hover:border-teal-200",
                              )}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-navy-900">
                    Bilgileriniz
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    İletişim bilgilerinizi girin.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">Ad</Label>
                      <Input
                        id="firstName"
                        value={data.firstName}
                        onChange={(e) => update({ firstName: e.target.value })}
                        className="mt-1.5"
                        autoComplete="given-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Soyad</Label>
                      <Input
                        id="lastName"
                        value={data.lastName}
                        onChange={(e) => update({ lastName: e.target.value })}
                        className="mt-1.5"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={data.phone}
                      onChange={(e) => update({ phone: e.target.value })}
                      className="mt-1.5"
                      placeholder="05XX XXX XX XX"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => update({ email: e.target.value })}
                      className="mt-1.5"
                      autoComplete="email"
                    />
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="notes">Şikayet / Not (İsteğe bağlı)</Label>
                    <Textarea
                      id="notes"
                      value={data.notes}
                      onChange={(e) => update({ notes: e.target.value })}
                      className="mt-1.5"
                      placeholder="Kısa şikayet veya notlarınız..."
                    />
                  </div>
                </div>
              )}

              {step === 3 && referenceId && (
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                    <CheckCircle2 className="h-8 w-8 text-teal-600" />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-navy-900">
                    Randevunuz Alındı!
                  </h2>
                  <p className="mt-2 text-slate-600">
                    Talebiniz başarıyla oluşturuldu. Onay için sizinle iletişime
                    geçilecektir.
                  </p>

                  <div className="mt-8 rounded-xl bg-slate-50 p-6 text-left">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Referans No
                    </p>
                    <p className="mt-1 font-mono text-xl font-bold text-teal-700">
                      {referenceId}
                    </p>

                    <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm">
                      <p>
                        <span className="text-slate-500">Hizmet:</span>{" "}
                        <span className="font-medium">{data.serviceName}</span>
                      </p>
                      <p>
                        <span className="text-slate-500">Tarih:</span>{" "}
                        <span className="font-medium">
                          {formatDateTR(new Date(data.date + "T00:00:00"))}
                        </span>
                      </p>
                      <p>
                        <span className="text-slate-500">Saat:</span>{" "}
                        <span className="font-medium">{data.timeSlot}</span>
                      </p>
                      <p>
                        <span className="text-slate-500">Danışan:</span>{" "}
                        <span className="font-medium">
                          {data.firstName} {data.lastName}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {step < 3 && (
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ChevronLeft className="h-4 w-4" /> Geri
              </Button>

              {step < 2 ? (
                <Button
                  type="button"
                  variant="teal"
                  disabled={!canProceed()}
                  onClick={() => setStep((s) => s + 1)}
                >
                  İleri <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="teal"
                  disabled={!canProceed() || loading}
                  onClick={handleSubmit}
                >
                  <User className="h-4 w-4" />
                  {loading ? "Gönderiliyor..." : "Randevu Oluştur"}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
