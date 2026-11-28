import type { CSSProperties } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { User } from "@phosphor-icons/react/dist/ssr/User";
import { TickIcon } from "./price-promise-icons";
import s from "./landing.module.css";

type Plan = { id: string; name: string; who: string; includes: string; features: string[]; price: string; unit: string; people: number; featured?: boolean };

/**
 * Plans are picked by who works in the inbox, so each card leads with the people it's for, then price,
 * then the button with the free-trial reassurance right under it. Only what differs between plans is listed.
 */
export function PlanCards({ plans, perMonth }: { plans: Plan[]; perMonth: string }) {
  return (
    <div className={s.planGrid}>
      {plans.map(plan => (
        <article key={plan.id} className={s.planCard} data-featured={plan.featured || undefined} data-spot="">
          <span className={s.planPeople} aria-hidden="true">
            {Array.from({ length: plan.people }, (_, i) => <i key={i} style={{ "--i": i } as CSSProperties}><User size={13} weight="bold" /></i>)}
          </span>
          <h3>{plan.name}</h3>
          <p className={s.planWho}>{plan.who}</p>
          <p className={s.planPrice}><b>{plan.price}</b><span>{perMonth}</span></p>
          <p className={s.planUnit}>{plan.unit}</p>
          <a href="#apply" className={plan.featured ? s.btnLight : s.btnGhost} data-marketing-cta={`pricing_${plan.id}`}>
            Apply for {plan.name}<span className={s.btnArrow} aria-hidden="true"><ArrowRight size={16} weight="bold" /></span>
          </a>
          <p className={s.planIncludes}>{plan.includes}</p>
          <ul className={s.planList}>{plan.features.map((f, i) => <li key={f} style={{ "--i": i } as CSSProperties}><TickIcon size={15} aria-hidden="true" />{f}</li>)}</ul>
        </article>
      ))}
    </div>
  );
}
