import Link from "next/link";
import MyAlert from "../components/ui/MyAlert";
import MyButton from "../components/ui/MyButton";
import MyCard from "../components/ui/MyCard";
import MyCheckbox from "../components/ui/MyCheckbox";
import MyDivider from "../components/ui/MyDivider";
import MyField from "../components/ui/MyField";
import MyHeader from "../components/ui/MyHeader";
import MyInput from "../components/ui/MyInput";
import MyLabel from "../components/ui/MyLabel";
import MyPageLayout from "../components/ui/MyPageLayout";
import MyRow from "../components/ui/MyRow";
import MySection from "../components/ui/MySection";
import MySelect from "../components/ui/MySelect";
import MySidebar from "../components/ui/MySidebar";
import MySummaryRow from "../components/ui/MySummaryRow";
import MyTextarea from "../components/ui/MyTextarea";
import Image from "next/image";

export default function UIPage() {
  const selectOptions = [
    { label: "Choose option", value: "" },
    { label: "Standard", value: "standard" },
    { label: "Premium", value: "premium" },
    { label: "Custom", value: "custom" },
  ];

  return (
    <main className="space-y-6 p-10">
      <div className="space-y-2 py-5">
        <Image
          src="/logo/logo-pfeifer-studio-large.svg"
          alt="Logo"
          width={240}
          height={80}
          className="object-contain"
        />
      </div>
      <header className="space-y-2 py-5">
        <h1 className="text-2xl font-bold">UI Playground</h1>
        <Link href="/">
          <MyButton variant="outline" size="medium">
            Go back to homepage
          </MyButton>
        </Link>
      </header>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Labels
      </MyLabel>

      <MyRow gap="large" align="center" justify="start">
        <MyLabel variant="default" size="small">
          Default Small Label
        </MyLabel>
        <MyLabel variant="muted" size="small">
          Muted Small Label
        </MyLabel>
        <MyLabel variant="error" size="small">
          Error Small Label
        </MyLabel>
      </MyRow>

      <MyRow gap="large" align="center" justify="start">
        <MyLabel variant="default" size="medium">
          Default Medium Label
        </MyLabel>
        <MyLabel variant="muted" size="medium">
          Muted Medium Label
        </MyLabel>
        <MyLabel variant="error" size="medium">
          Error Medium Label
        </MyLabel>
      </MyRow>

      <MyRow gap="large" align="center" justify="start">
        <MyLabel variant="default" size="large">
          Default Large Label
        </MyLabel>
        <MyLabel variant="muted" size="large">
          Muted Large Label
        </MyLabel>
        <MyLabel variant="error" size="large">
          Error Large Label
        </MyLabel>
      </MyRow>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Buttons
      </MyLabel>

      <MyRow gap="large" align="center" justify="start">
        <MyButton variant="primary" size="medium">
          Primary Medium Button
        </MyButton>
        <MyButton variant="secondary" size="medium">
          Secondary Medium Button
        </MyButton>
        <MyButton variant="outline" size="medium">
          Outline Medium Button
        </MyButton>
      </MyRow>

      <MyRow gap="large" align="center" justify="start">
        <MyButton variant="primary" size="small">
          Primary Small Button
        </MyButton>
        <MyButton variant="secondary" size="small">
          Secondary Small Button
        </MyButton>
        <MyButton variant="outline" size="small">
          Outline Small Button
        </MyButton>
      </MyRow>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Inputs
      </MyLabel>

      <div className="max-w-2xl space-y-4">
        <div className="space-y-2">
          <MyLabel size="small">Text Input</MyLabel>
          <MyInput placeholder="Enter product name" />
        </div>

        <div className="space-y-2">
          <MyLabel size="small">Number Input</MyLabel>
          <MyInput type="number" placeholder="1200" />
        </div>

        <div className="space-y-2">
          <MyLabel size="small">Disabled Input</MyLabel>
          <MyInput value="Disabled value" disabled readOnly />
        </div>

        <div className="space-y-2">
          <MyLabel size="small">Textarea</MyLabel>
          <MyTextarea placeholder="Add notes for this configuration" />
        </div>
      </div>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Cards
      </MyLabel>

      <div className="max-w-2xl space-y-4">
        <MyCard>
          <div className="space-y-2">
            <MyLabel size="medium">Basic Card</MyLabel>
            <p className="text-sm text-zinc-600">
              Simple content container for grouped information.
            </p>
          </div>
        </MyCard>

        <MyCard>
          <div className="space-y-3">
            <MyLabel size="medium">Card With Actions</MyLabel>
            <MyRow gap="small">
              <MyButton variant="primary" size="small">
                Save
              </MyButton>
              <MyButton variant="outline" size="small">
                Cancel
              </MyButton>
            </MyRow>
          </div>
        </MyCard>
      </div>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Selects
      </MyLabel>

      <div className="max-w-2xl space-y-4">
        <div className="space-y-2">
          <MyLabel size="small">Basic Select</MyLabel>
          <MySelect options={selectOptions} />
        </div>

        <div className="space-y-2">
          <MyLabel size="small">Select With Default Value</MyLabel>
          <MySelect options={selectOptions} defaultValue="premium" />
        </div>

        <div className="space-y-2">
          <MyLabel size="small">Disabled Select</MyLabel>
          <MySelect options={selectOptions} defaultValue="custom" disabled />
        </div>
      </div>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Checkboxes
      </MyLabel>

      <div className="max-w-2xl space-y-4">
        <MyCheckbox label="Enable notifications" />
        <MyCheckbox
          label="Include installation"
          description="Adds installation service to the final configuration."
        />
        <MyCheckbox label="Disabled checkbox" defaultChecked disabled />
      </div>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Fields
      </MyLabel>

      <div className="max-w-2xl space-y-4">
        <MyCard>
          <div className="space-y-4">
            <MyField
              label="Product Name"
              description="Internal name visible in the configurator."
            >
              <MyInput placeholder="Enter product name" />
            </MyField>

            <MyField label="Variant">
              <MySelect options={selectOptions} defaultValue="standard" />
            </MyField>

            <MyField label="Notes">
              <MyTextarea placeholder="Add notes for this configuration" />
            </MyField>

            <MyField label="Width" error="Width is required.">
              <MyInput type="number" placeholder="1200" />
            </MyField>
          </div>
        </MyCard>
      </div>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Sections
      </MyLabel>

      <div className="max-w-3xl space-y-4">
        <MySection
          title="Configuration Section"
          description="Use sections to split the configurator into clear content blocks."
          actions={
            <MyButton variant="outline" size="small">
              Edit
            </MyButton>
          }
        >
          <div className="space-y-3">
            <p className="text-sm text-zinc-600">
              This is a simple section body for grouped content.
            </p>
            <MyRow gap="small">
              <MyButton variant="primary" size="small">
                Save
              </MyButton>
              <MyButton variant="secondary" size="small">
                Cancel
              </MyButton>
            </MyRow>
          </div>
        </MySection>
      </div>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Alerts
      </MyLabel>

      <div className="max-w-2xl space-y-3">
        <MyAlert variant="info" title="Info">
          This is an informational message for the user.
        </MyAlert>
        <MyAlert variant="success" title="Success">
          Changes have been saved successfully.
        </MyAlert>
        <MyAlert variant="warning" title="Warning">
          Double-check the selected parameters before continuing.
        </MyAlert>
        <MyAlert variant="error" title="Error">
          Something went wrong while validating the configuration.
        </MyAlert>
      </div>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Summary Rows
      </MyLabel>

      <div className="max-w-2xl">
        <MyCard>
          <MySummaryRow label="Model" value="Standard" />
          <MySummaryRow label="Width" value="1200 mm" />
          <MySummaryRow label="Finish" value="Matte black" />
          <MySummaryRow
            label="Total Price"
            value="$2,450"
            className="border-b-0"
          />
        </MyCard>
      </div>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Header
      </MyLabel>

      <div className="max-w-3xl">
        <MyHeader
          title="Configurator Header"
          description="A light page header with supporting description and actions."
          actions={
            <MyRow gap="small">
              <MyButton variant="outline" size="small">
                Back
              </MyButton>
              <MyButton variant="primary" size="small">
                Continue
              </MyButton>
            </MyRow>
          }
        />
      </div>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Sidebar
      </MyLabel>

      <div className="max-w-sm">
        <MySidebar title="Selected Parameters">
          <MySummaryRow label="Variant" value="Premium" />
          <MySummaryRow label="Width" value="1200 mm" />
          <MySummaryRow label="Color" value="Black" className="border-b-0" />
        </MySidebar>
      </div>

      <MyDivider />

      <MyLabel variant="default" size="large">
        Page Layout
      </MyLabel>

      <MyCard className="bg-zinc-50">
        <MyPageLayout
          header={
            <MyHeader
              title="Product Configurator"
              description="Simple page layout with header, sidebar and main content."
              actions={
                <MyButton variant="primary" size="small">
                  Save Configuration
                </MyButton>
              }
            />
          }
          sidebar={
            <MySidebar title="Summary">
              <MySummaryRow label="Model" value="Premium" />
              <MySummaryRow label="Width" value="1400 mm" />
              <MySummaryRow
                label="Price"
                value="$3,200"
                className="border-b-0"
              />
            </MySidebar>
          }
        >
          <div className="space-y-4">
            <MySection
              title="Main Content"
              description="This area can hold the main configurator form or preview."
            >
              <div className="space-y-3">
                <MyAlert variant="info" title="Preview">
                  Use the sidebar for summary data and keep the main area
                  focused on editing.
                </MyAlert>
                <MyCard>
                  <div className="space-y-3">
                    <MyField label="Product Name">
                      <MyInput placeholder="Enter product name" />
                    </MyField>
                    <MyField label="Variant">
                      <MySelect
                        options={selectOptions}
                        defaultValue="premium"
                      />
                    </MyField>
                  </div>
                </MyCard>
              </div>
            </MySection>
          </div>
        </MyPageLayout>
      </MyCard>

      <MyDivider />
    </main>
  );
}
