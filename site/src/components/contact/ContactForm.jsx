import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BrandButton from "@/components/common/BrandButton"
import Icon from "@/components/brand/Icon"
import { contactTopics } from "@/data/patients"
import { practice } from "@/data/site"

// Visible 1px field borders (darker than the default hairline), white fill, 16px text.
const field = "border-primary/45 bg-white px-3 text-base md:text-base"

const empty = { name: "", email: "", topic: "", message: "" }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = "Please enter your name."
  if (!v.email.trim()) e.email = "Please enter your email address."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter an email address like name@example.com."
  if (!v.topic) e.topic = "Please choose a topic."
  if (!v.message.trim()) e.message = "Please write a short message."
  else if (v.message.trim().length < 10) e.message = "Please add a little more detail, at least 10 characters."
  return e
}

function FieldError({ id, children }) {
  if (!children) return null
  return (
    <p id={id} className="mt-2 text-base font-medium text-destructive">
      {children}
    </p>
  )
}

// Front-end only. Valid submit shows an honest confirmation: nothing is delivered.
export default function ContactForm() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  const set = (k) => (val) => {
    setValues((s) => ({ ...s, [k]: val }))
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }))
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = ["name", "email", "topic", "message"].find((k) => found[k])
    if (first) {
      document.getElementById(`contact-${first}`)?.focus()
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <div role="status" className="rounded-2xl border border-border bg-white p-7 sm:p-9">
        <span className="flex size-14 items-center justify-center rounded-full bg-tint text-primary" aria-hidden="true">
          <Icon name="message" size={28} />
        </span>
        <h3 className="mt-6 text-2xl text-primary sm:text-3xl">Thank you</h3>
        <p className="mt-3 text-lg">
          Thank you. To reach the office right away, call or text{" "}
          <span className="whitespace-nowrap font-medium">{practice.phone}</span>.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <BrandButton href={practice.phoneHref} icon="phone" iconPosition="start" className="w-full sm:w-auto">
            Call {practice.phone}
          </BrandButton>
          <BrandButton variant="outline" href={practice.smsHref} icon="message" iconPosition="start" className="w-full sm:w-auto">
            Text us
          </BrandButton>
        </div>
        <BrandButton
          variant="quiet"
          className="mt-4 min-h-11"
          onClick={() => {
            setValues(empty)
            setErrors({})
            setDone(false)
          }}
        >
          Write another message
        </BrandButton>
      </div>
    )
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-border bg-white p-6 sm:p-9" aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" className="text-2xl text-primary sm:text-3xl">
        Send a general question
      </h2>
      <p className="mt-3 rounded-lg bg-tint px-4 py-3 text-base font-medium text-primary">
        Please do not enter sensitive medical information.
      </p>

      {errorCount > 0 && (
        <p role="alert" className="mt-4 text-base font-medium text-destructive">
          Please fix the {errorCount === 1 ? "1 field" : `${errorCount} fields`} marked below.
        </p>
      )}

      <div className="mt-6 grid gap-5 lg:mt-[clamp(1rem,2.5vh,1.5rem)] lg:gap-[clamp(0.75rem,1.9vh,1.25rem)]">
        <div>
          <Label htmlFor="contact-name" className="mb-2 text-base">
            Your name
          </Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`${field} h-12`}
          />
          <FieldError id="contact-name-error">{errors.name}</FieldError>
        </div>

        <div>
          <Label htmlFor="contact-email" className="mb-2 text-base">
            Email address
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={`${field} h-12`}
          />
          <FieldError id="contact-email-error">{errors.email}</FieldError>
        </div>

        <div>
          <Label htmlFor="contact-topic" className="mb-2 text-base">
            Topic
          </Label>
          <Select value={values.topic} onValueChange={(v) => set("topic")(v ?? "")}>
            <SelectTrigger
              id="contact-topic"
              aria-invalid={errors.topic ? true : undefined}
              aria-describedby={errors.topic ? "contact-topic-error" : undefined}
              className={`${field} w-full px-3 data-[size=default]:h-12`}
            >
              <SelectValue placeholder="Choose a topic" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {contactTopics.map((t) => (
                <SelectItem key={t} value={t} className="min-h-11 text-base">
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="contact-topic-error">{errors.topic}</FieldError>
        </div>

        <div>
          <Label htmlFor="contact-message" className="mb-2 text-base">
            Your message
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={4}
            value={values.message}
            onChange={(e) => set("message")(e.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${field} min-h-32 py-3 lg:min-h-[clamp(5rem,11vh,8rem)]`}
          />
          <FieldError id="contact-message-error">{errors.message}</FieldError>
        </div>
      </div>

      <div className="mt-7">
        <BrandButton type="submit" icon="send" className="w-full sm:w-auto">
          Send question
        </BrandButton>
      </div>
      <p className="mt-5 text-base text-foreground/80">
        For anything time-sensitive, please call or text the office instead.
      </p>
    </form>
  )
}
