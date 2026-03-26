import Link from "next/link";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Checkbox from "../components/ui/Checkbox";
import DrawingCard from "../components/ui/DrawingCard";
import Input from "../components/ui/Input";
import ParameterCard from "../components/ui/ParameterCard";
import ParameterRow from "../components/ui/ParameterRow";
import Select from "../components/ui/Select";
import { getLocale, getMessages } from "@/messages";

const optionValues = ["standard", "premium", "custom"] as const;

type UIPageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function UIPage({ searchParams }: UIPageProps) {
  const { lang } = await searchParams;
  const locale = getLocale(lang);
  const messages = getMessages(locale);

  const selectOptions = optionValues.map((value) => ({
    value,
    label: messages.selectOptions[value],
  }));

  const sectionClassName =
    "space-y-4 rounded-lg border border-slate-200 bg-sky-50/80 p-6 shadow-sm";

  return (
    <main className="space-y-8 p-10">
      <div>
        <Link href={{ pathname: "/", query: { lang: locale } }}>
          <Button variant="primary">{messages.ui.goBackToHomepage}</Button>
        </Link>
      </div>

      <header className="space-y-2 py-5">
        <h1 className="text-2xl font-bold">{messages.ui.title}</h1>
      </header>

      <section className={sectionClassName}>
        <h2 className="text-xl font-semibold">{messages.ui.buttons}</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">{messages.buttons.save}</Button>
          <Button variant="secondary">{messages.buttons.cancel}</Button>
          <Button variant="outline">{messages.buttons.more}</Button>
        </div>
      </section>

      <section className={sectionClassName}>
        <h2 className="text-xl font-semibold">{messages.ui.inputs}</h2>
        <div className="max-w-md space-y-4">
          <Input placeholder={messages.inputs.fullName} />
          <Input type="email" placeholder={messages.inputs.email} />
          <Input type="password" placeholder={messages.inputs.password} />
          <Input
            type="number"
            numberVariant="integer"
            placeholder={messages.inputs.number}
          />
          <Input
            type="number"
            numberVariant="decimal"
            placeholder={messages.inputs.amount}
          />
        </div>
      </section>

      <section className={sectionClassName}>
        <h2 className="text-xl font-semibold">{messages.ui.select}</h2>
        <div className="max-w-md">
          <Select defaultValue="premium" options={selectOptions} />
        </div>
      </section>

      <section className={sectionClassName}>
        <h2 className="text-xl font-semibold">{messages.ui.checkbox}</h2>
        <div className="space-y-4">
          <Checkbox
            label={messages.checkbox.acceptTermsLabel}
            description={messages.checkbox.acceptTermsDescription}
          />
          <Checkbox
            label={messages.checkbox.includeCalculationsLabel}
            description={messages.checkbox.includeCalculationsDescription}
            defaultChecked
          />
        </div>
      </section>

      <section className={sectionClassName}>
        <h2 className="text-xl font-semibold">{messages.ui.cards}</h2>
        <div className="grid min-h-24 gap-4 rounded-xl md:grid-cols-2">
          <Card
            title={messages.cards.firstTitle}
            text={messages.cards.firstText}
          />
          <Card
            title={messages.cards.secondTitle}
            text={messages.cards.secondText}
          />
        </div>
      </section>

      <section className={sectionClassName}>
        <h2 className="text-xl font-semibold">{messages.ui.drawingCard}</h2>

        <div className="grid min-h-24 gap-4 rounded-xl md:grid-cols-2">
          <DrawingCard
            title={messages.cards.firstTitle}
            subtitle={messages.cards.firstSubtitle}
          >
            <div className="text-gray-400">{messages.cards.drawingPlaceholder}</div>
          </DrawingCard>

          <DrawingCard
            title={messages.cards.secondTitle}
            subtitle={messages.cards.secondSubtitle}
          >
            <div className="text-gray-400">Placeholder</div>
          </DrawingCard>
        </div>
      </section>

      <section className={sectionClassName}>
        <h2 className="text-xl font-semibold">{messages.ui.parameterCard}</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <ParameterCard
            title={messages.parameterCard.geometryTitle}
            description={messages.parameterCard.geometryDescription}
          >
            <div className="space-y-3">
              <ParameterRow
                label={messages.parameters.width}
                unit={messages.units.millimeters}
              >
                <Input type="number" numberVariant="integer" placeholder="120" />
              </ParameterRow>

              <ParameterRow
                label={messages.parameters.height}
                unit={messages.units.millimeters}
              >
                <Input type="number" numberVariant="integer" placeholder="240" />
              </ParameterRow>

              <ParameterRow
                label={messages.parameters.thickness}
                unit={messages.units.millimeters}
              >
                <Input type="number" numberVariant="decimal" placeholder="12.5" />
              </ParameterRow>

              <ParameterRow
                label={messages.parameters.mass}
                unit={messages.units.kilograms}
              >
                <Input type="number" numberVariant="decimal" placeholder="18.2" />
              </ParameterRow>
            </div>
          </ParameterCard>

          <ParameterCard
            title={messages.parameterCard.workingTitle}
            description={messages.parameterCard.workingDescription}
          >
            <div className="space-y-3">
              <ParameterRow
                label={messages.parameters.pressure}
                unit={messages.units.bar}
              >
                <Input type="number" numberVariant="decimal" placeholder="6.5" />
              </ParameterRow>

              <ParameterRow
                label={messages.parameters.temperature}
                unit={messages.units.celsius}
              >
                <Input type="number" numberVariant="decimal" placeholder="85" />
              </ParameterRow>

              <ParameterRow
                label={messages.parameters.length}
                unit={messages.units.millimeters}
              >
                <Input type="number" numberVariant="integer" placeholder="1500" />
              </ParameterRow>

              <ParameterRow label={messages.parameters.type}>
                <Select defaultValue="standard" options={selectOptions} />
              </ParameterRow>

              <ParameterRow
                label={messages.parameters.coefficient}
                unit={messages.units.none}
              >
                <Input type="number" numberVariant="decimal" placeholder="1.25" />
              </ParameterRow>
            </div>
          </ParameterCard>
        </div>
      </section>
    </main>
  );
}
