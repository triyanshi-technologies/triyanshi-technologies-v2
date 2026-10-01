import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form-fields";
import { Badge, Card, Highlight, Section, SectionTitle } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// TEMPORARY — stage 1 checkpoint: design-system preview. Replaced by the real homepage in stage 2.
export const metadata = buildMetadata({ description: site.description, path: "/", index: false });

export default function HomePage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Design System <Highlight>Preview</Highlight>
          </>
        }
        description="Stage 1 checkpoint — tokens, buttons, fields, cards and scroll reveals."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Preview" }]}
      />

      <Section tone="light">
        <SectionTitle eyebrow="Typography" title="Type scale" />
        <div className="grid gap-3">
          <p className="text-display font-bold text-ink">Display</p>
          <p className="text-heading-xl font-bold text-ink">Heading XL</p>
          <p className="text-heading-lg font-bold text-ink">Heading LG</p>
          <p className="text-heading-md font-bold text-ink">Heading MD</p>
          <p className="text-heading-sm font-bold text-ink">Heading SM</p>
          <p className="text-xl">Text XL — 1.25rem</p>
          <p className="text-lg">Text LG — 1.125rem</p>
          <p className="text-base">Text base — 1rem</p>
          <p className="text-sm">Text SM — 0.875rem</p>
          <p className="text-xs">Text XS — 0.75rem</p>
          <p className="text-2xs">Text 2XS — 0.6875rem</p>
        </div>
      </Section>

      <Section tone="dark">
        <SectionTitle eyebrow="Buttons" title="On dark" />
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contact-us/contact-us">Primary</ButtonLink>
          <ButtonLink href="/contact-us/contact-us" variant="outline">
            Outline
          </ButtonLink>
          <ButtonLink href="/contact-us/contact-us" variant="light">
            Light
          </ButtonLink>
          <Button loading>Primary</Button>
        </div>
      </Section>

      <Section>
        <SectionTitle
          eyebrow="Cards"
          title="Scroll reveal group"
          description="Cards stagger in as they enter the viewport."
        />
        <RevealGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {["Shopify", "BigCommerce", "Webflow"].map((name) => (
            <RevealItem key={name}>
              <Card interactive className="p-6">
                <Badge>{name}</Badge>
                <h3 className="mb-2 text-heading-sm">{name} project</h3>
                <p>Card body copy uses the body colour token and 1.6 line height.</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="light">
        <SectionTitle eyebrow="Forms" title="Fields" />
        <Reveal variant="zoom" className="mx-auto grid max-w-xl gap-4">
          <Field id="demo-name" label="Name" required>
            <Input id="demo-name" placeholder="Name *" />
          </Field>
          <Field id="demo-email" label="Email" required>
            <Input id="demo-email" type="email" placeholder="E-mail Address *" aria-invalid />
          </Field>
          <Field id="demo-platform" label="Platform">
            <Select id="demo-platform" defaultValue="shopify">
              <option value="shopify">Shopify</option>
              <option value="bigcommerce">BigCommerce</option>
            </Select>
          </Field>
          <Field id="demo-message" label="Message" hideLabel>
            <Textarea id="demo-message" placeholder="Message *" />
          </Field>
          <Button type="submit" className="w-fit">
            Send Message
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
