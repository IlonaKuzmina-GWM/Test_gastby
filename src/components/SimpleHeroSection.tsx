import React, { FC } from "react";

type SimpleHeroProps = {
    heroTitleFirstLine: string,
    heroTitleSecondLine?: string
}

const SimpleHero: FC<SimpleHeroProps> = ({ heroTitleFirstLine, heroTitleSecondLine }) => {
    return (
        <section className="simple__hero-wrapper container pb-2 pb-md-4">
            <div>
                <h1 className="fs-1 mb-4 fw-bold lh-base">{heroTitleFirstLine} <br />{heroTitleSecondLine}</h1>
            </div>
        </section>)
}

export default SimpleHero;