"use client";

import type { ReactNode } from "react";
import MyButton from "@/app/components/ui/MyButton";
import MyBearingsModuleDrawing from "../drawings/MyBearingsModuleDrawing";
import type {
  MyBearingsBeamTopHeadArrangement,
  MyBearingsConnectionType,
  MyBearingsModuleFireResistance,
  MyBearingsModuleForceAndDeformation,
  MyBearingsModuleParameters,
} from "../model/types";
import type { MyBearingsSelectedPadDrawing } from "../MyBearingsModuleConfigurator";
import type { MyBearingsCalculationNote } from "../model/presentation/getMyBearingsCalculationNote";

type MyBearingsCalculationNotePreviewProps = {
  note: MyBearingsCalculationNote;
  geometry: MyBearingsModuleParameters;
  connectionType: MyBearingsConnectionType;
  beamTopHeadArrangement: MyBearingsBeamTopHeadArrangement;
  hasStuds: boolean;
  forceAndDeformation: MyBearingsModuleForceAndDeformation;
  fireResistance: MyBearingsModuleFireResistance;
  selectedPadDrawing: MyBearingsSelectedPadDrawing | null;
  onClose: () => void;
};

function formatNumber(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}

function CheckRow({ label, value }: { label: ReactNode; value: string }) {
  return (
    <div className="calculation-note-row flex items-baseline justify-between gap-3 border-b border-zinc-200 py-1 text-[11px] leading-4">
      <span className="text-zinc-600">{label}</span>
      <span className="text-right font-medium text-zinc-900">{value}</span>
    </div>
  );
}

function ProjectField({ label }: { label: string }) {
  return (
    <div className="calculation-note-project-field flex items-baseline gap-3 py-1 text-[11px] leading-4">
      <span className="text-zinc-600">{label}:</span>
      <span className="min-w-0 flex-1 border-b border-zinc-300" aria-label={`${label} not specified`} />
    </div>
  );
}

function InputGroup({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="calculation-note-card break-inside-avoid rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2">
      <h2 className="calculation-note-card-title text-xs font-semibold text-zinc-900">{title}</h2>
      <div className="mt-1">{children}</div>
    </section>
  );
}

const HEAD_ARRANGEMENT_LABELS: Record<MyBearingsBeamTopHeadArrangement, string> = {
  "no-upstand": "No upstand",
  "two-beams": "Two beams",
  "outer-head-upstand": "Outer head upstand",
  "three-sided-head-upstand": "Three-sided head upstand",
};

function MyPfeiferLogoVector() {
  return (
    <svg
      viewBox="0 0 414.6 45.4"
      width="166"
      height="18"
      className="h-auto w-32"
      aria-hidden="true"
      focusable="false"
    >
      <polygon fill="#001871" points="193.7,45.3 219.9,45.3 219.9,0 193.7,0" />
      <polygon fill="#001871" points="290.4,45.4 346.1,45.4 346.1,34.9 319.5,34.9 319.5,27.8 346.1,27.8 346.1,17.6 319.5,17.6 319.5,10.5 346.1,10.5 346.1,0 290.4,0" />
      <polygon fill="#001871" points="228.8,45.4 256.6,45.4 256.6,27.8 282.4,27.8 282.4,17.6 256.6,17.6 256.6,10.5 282.4,10.5 282.4,0 228.8,0" />
      <polygon fill="#001871" points="67.6,45.3 95.4,45.3 95.4,27.8 121.2,27.8 121.2,17.6 95.2,17.6 95.2,10.5 121.2,10.5 121.2,0 67.6,0" />
      <path fill="#001871" d="M407.6,26.9c2.2-0.6,4.1-2,5.3-3.9c1.2-2.6,1.8-5.5,1.7-8.4c0-4.7-1.1-8.3-3.4-10.7s-5.9-3.8-11-3.8h-46.2v45.3h26.5V31.4h8v13.9h25.5V36C414.1,31.5,411.1,28.4,407.6,26.9L407.6,26.9z M388.7,25.3h-8V9.8h8V25.3L388.7,25.3z" />
      <path fill="#001871" d="M57,3.6C54.4,1.1,50.6,0,45.7,0H0v45.3h27.2V31.5h18.5c5-0.2,8.9-1.4,11.6-4s3.8-6.3,3.8-11.7C61.1,10,59.7,6.1,57,3.6L57,3.6z M35.2,25.3h-8V9.8h8V25.3L35.2,25.3z" />
      <polygon fill="#001871" points="129.2,45.4 185.1,45.4 185.1,34.9 158.4,34.9 158.4,27.8 185,27.8 185,17.6 158.4,17.6 158.4,10.5 185.1,10.5 185.1,0 129.2,0" />
    </svg>
  );
}

export default function MyBearingsCalculationNotePreview({
  note,
  geometry,
  connectionType,
  beamTopHeadArrangement,
  hasStuds,
  forceAndDeformation,
  fireResistance,
  selectedPadDrawing,
  onClose,
}: MyBearingsCalculationNotePreviewProps) {
  const isBeamTop = connectionType === "beam-top";

  return (
    <>
      <style jsx global>{`
        @page { size: A4; margin: 12mm; }
        @media print {
          body * { visibility: hidden; }
          #calculation-note-print, #calculation-note-print * { visibility: visible; }
          #calculation-note-print {
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            width: 100%;
            min-height: 273mm;
            flex-direction: column;
            box-shadow: none;
          }
          #calculation-note-print .calculation-note-content {
            display: flex;
            min-height: 0;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;
          }
          #calculation-note-print .calculation-note-content > section,
          #calculation-note-print .calculation-note-content > div {
            margin-top: 0;
          }
          #calculation-note-print .calculation-note-row,
          #calculation-note-print .calculation-note-project-field {
            padding-top: 1.15mm;
            padding-bottom: 1.15mm;
            font-size: 12px;
            line-height: 1.35;
          }
          #calculation-note-print .calculation-note-card {
            padding: 3mm;
          }
          #calculation-note-print .calculation-note-card-title {
            font-size: 12px;
          }
        }
      `}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 p-4 print:static print:block print:bg-white print:p-0">
        <div className="flex max-h-full w-full max-w-[210mm] flex-col overflow-hidden rounded-xl bg-white shadow-2xl print:max-w-none print:rounded-none print:shadow-none">
          <div className="flex items-center justify-between gap-4 border-b border-zinc-200 px-5 py-3 print:hidden">
            <div>
              <div className="text-sm font-semibold text-zinc-900">
                Calculation note preview
              </div>
              <div className="text-xs text-zinc-500">Review before printing or saving as PDF</div>
            </div>
            <div className="flex gap-2">
              <MyButton size="small" variant="outline" onClick={() => window.print()}>
                Print / Save as PDF
              </MyButton>
              <MyButton size="small" variant="secondary" onClick={onClose}>
                Close
              </MyButton>
            </div>
          </div>
          <div className="overflow-y-auto bg-zinc-100 p-4 print:overflow-visible print:bg-white print:p-0">
            <article id="calculation-note-print" className="min-h-[273mm] bg-white px-[14mm] py-[15mm] text-zinc-900 print:min-h-0 print:p-0">
              <header className="border-b-2 border-[#163554] pb-3">
                <div className="flex items-center gap-2" role="img" aria-label="PFEIFER Studio">
                  <MyPfeiferLogoVector />
                  <span className="font-mono text-[22px] font-medium leading-none tracking-tight text-[#B7352F]">
                    Studio
                  </span>
                </div>
                <div className="mt-1 text-base" style={{ fontFamily: "var(--font-michroma)" }}>
                  Elastomeric Bearing Calculator
                </div>
                <div className="mt-1 text-xs text-zinc-600">Calculation note - draft preview</div>
              </header>

              <div className="calculation-note-content mt-4">
              <div className="grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-3">
                <section className="break-inside-avoid">
                  <h1 className="text-sm font-semibold">Project data</h1>
                  <div className="mt-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1">
                    <ProjectField label="Project" />
                    <ProjectField label="Position" />
                    <ProjectField label="Quantity" />
                  </div>
                </section>

                <section className="break-inside-avoid">
                  <h1 className="text-sm font-semibold">Selected bearing</h1>
                  <div className="mt-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1">
                    <CheckRow label="Bearing" value={note.bearing.name} />
                    <CheckRow label="Dimensions (b × a × t)" value={note.bearing.dimensions} />
                    {note.bearing.openings ? <CheckRow label="Openings" value={note.bearing.openings} /> : null}
                    {note.bearing.fireProtection ? <CheckRow label="Fire protection" value={note.bearing.fireProtection} /> : null}
                  </div>
                </section>
              </div>

              <section className="mt-4">
                <h1 className="text-sm font-semibold">Input data</h1>
                <div className="mt-2 grid grid-cols-2 items-stretch gap-3">
                  <InputGroup title="Connection geometry">
                    <CheckRow
                      label="Connection type"
                      value={isBeamTop ? "Beam top" : "Cantilever"}
                    />
                    <CheckRow
                      label="Beam type"
                      value={geometry.isEndNotchedBeam ? "With end notch" : "Without end notch"}
                    />
                    {isBeamTop ? (
                      <CheckRow
                        label="Column head arrangement"
                        value={HEAD_ARRANGEMENT_LABELS[beamTopHeadArrangement]}
                      />
                    ) : null}
                    <CheckRow label={<>Bearing gap t<sub>c</sub></>} value={`${formatNumber(geometry.tc)} mm`} />
                    <CheckRow label={<>Bearing edge distance c<sub>min</sub></>} value={`${formatNumber(geometry.cmin)} mm`} />
                    {isBeamTop ? (
                      <>
                        <CheckRow label={<>Column width A<sub>2</sub></>} value={`${formatNumber(geometry.a2)} mm`} />
                        <CheckRow label={<>Column width B<sub>3</sub></>} value={`${formatNumber(geometry.b3)} mm`} />
                        <CheckRow label={<>Beam width B<sub>2</sub></>} value={`${formatNumber(geometry.b2)} mm`} />
                        <CheckRow label={<>Column-beam offset g<sub>2</sub></>} value={`${formatNumber(geometry.g2)} mm`} />
                      </>
                    ) : (
                      <>
                        <CheckRow label={<>Cantilever length A<sub>1</sub></>} value={`${formatNumber(geometry.a1)} mm`} />
                        <CheckRow label={<>Cantilever width B<sub>1</sub></>} value={`${formatNumber(geometry.b1)} mm`} />
                        <CheckRow label={<>Beam width B<sub>2</sub></>} value={`${formatNumber(geometry.b2)} mm`} />
                        <CheckRow label={<>Column-beam offset g<sub>1</sub></>} value={`${formatNumber(geometry.g1)} mm`} />
                      </>
                    )}
                  </InputGroup>

                  <figure className="flex h-full break-inside-avoid flex-col rounded-lg border border-zinc-200 bg-white p-2">
                    <MyBearingsModuleDrawing
                      {...geometry}
                      connectionType={connectionType}
                      beamTopHeadArrangement={beamTopHeadArrangement}
                      hasStuds={hasStuds}
                      selectedPadDrawing={selectedPadDrawing}
                      ariaLabel="Connection drawing"
                      className="min-h-0 flex-1 [&>svg]:h-full [&>svg]:min-w-0 [&>svg]:flex-1"
                    />
                    <figcaption className="mt-1 text-center text-[10px] leading-3 text-zinc-500">
                      Connection drawing - side view and plan
                    </figcaption>
                  </figure>

                  <InputGroup title="Studs">
                    <CheckRow label="Studs" value={hasStuds ? "Yes" : "No"} />
                    {hasStuds ? (
                      <>
                        <CheckRow label="Number of studs n" value={String(geometry.n)} />
                        <CheckRow label={<>Stud diameter d<sub>s</sub></>} value={`${formatNumber(geometry.ds)} mm`} />
                        <CheckRow label={<>Edge distance e<sub>1</sub></>} value={`${formatNumber(geometry.e1)} mm`} />
                        <CheckRow label={<>Edge distance e<sub>2</sub></>} value={`${formatNumber(geometry.e2)} mm`} />
                        {geometry.n === 2 ? (
                          <CheckRow label={<>Edge distance e<sub>3</sub></>} value={`${formatNumber(geometry.e3)} mm`} />
                        ) : null}
                      </>
                    ) : null}
                  </InputGroup>

                  <InputGroup title="Actions and fire resistance">
                    <CheckRow label={<>Design vertical force F<sub>Ed</sub></>} value={`${formatNumber(forceAndDeformation.designVerticalForce)} kN`} />
                    <CheckRow
                      label="Bearing rotation α"
                      value={
                        forceAndDeformation.isBearingRotationCheckEnabled
                          ? `${formatNumber(forceAndDeformation.bearingRotation)} ‰`
                          : "not specified"
                      }
                    />
                    <CheckRow
                      label="Horizontal deformation u"
                      value={
                        forceAndDeformation.isHorizontalDeformationCheckEnabled
                          ? `${formatNumber(forceAndDeformation.horizontalDeformation)} mm`
                          : "not specified"
                      }
                    />
                    <CheckRow
                      label="Fire resistance"
                      value={fireResistance === "not-specified" ? "not specified" : fireResistance}
                    />
                  </InputGroup>
                </div>
              </section>

              <section className="mt-4">
                <h1 className="text-sm font-semibold">Verification</h1>
                <div className={`mt-2 grid gap-3 ${note.fire ? "grid-cols-3" : "grid-cols-2"}`}>
                  <InputGroup title="ULS">
                    <CheckRow label={<>Design force F<sub>Ed</sub></>} value={`${formatNumber(note.uls.designForceKN)} kN`} />
                    <CheckRow label={<>Design resistance F<sub>Rd</sub></>} value={`${formatNumber(note.uls.designResistanceKN)} kN`} />
                    <CheckRow label="Usage" value={`${formatNumber(note.uls.usagePercent, 1)}%`} />
                    <CheckRow label="ULS check" value={note.uls.status} />
                  </InputGroup>

                  <InputGroup title="Rotation and horizontal deformation">
                    <CheckRow label="Maximum α" value={`${formatNumber(note.rotation.maximumPermille)} ‰`} />
                    <CheckRow label="Rotation check" value={note.rotation.isChecked ? note.rotation.status : "not specified"} />
                    <CheckRow label="Maximum u" value={`${formatNumber(note.displacement.maximumMm)} mm`} />
                    <CheckRow label="Deformation check" value={note.displacement.isChecked ? note.displacement.status : "not specified"} />
                  </InputGroup>

                  {note.fire ? (
                    <InputGroup title="Fire">
                      <CheckRow label="Requirement" value={note.fire.requirement} />
                      <CheckRow label="Design resistance" value={`${formatNumber((note.fire.designForceKN * 100) / Math.max(note.fire.usagePercent, Number.EPSILON))} kN`} />
                      <CheckRow label="Usage" value={`${formatNumber(note.fire.usagePercent, 1)}%`} />
                      <CheckRow label="Fire check" value={note.fire.status} />
                    </InputGroup>
                  ) : null}
                </div>
              </section>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
