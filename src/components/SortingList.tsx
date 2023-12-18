import React, { FC, useState } from "react";

type SortingListProps = {
    onClickHandler: (sort: string) => void;
}

const SortingList: FC<SortingListProps> = ({ onClickHandler }) => {
    const [sortingType, setSortingType] = useState("");

    return (
        <div className="sorting-list d-flex gap-2 align-items-center">
            <label htmlFor="sortDropDown" className="fs-6">Sortēt: </label>
            <select
                className="form-select form-select-sm border border-0"
                name="sortDropDown"
                id="sortDropDown"
                value={sortingType}
                onChange={(e) => { setSortingType(e.target.value); onClickHandler(e.target.value); }}>
                <option className="fs-6" value="">Tikko pievienotās</option>
                <option className="fs-6" value="descending price">Cena (no augstākās)</option>
                <option className="fs-6" value="ascending price">Cena (no zemākās)</option>
                <option className="fs-6" value="descending mileage">Nobraukums (no mazākā)</option>
                <option className="fs-6" value="ascending mileage">Nobraukums (no lielākā)</option>
                <option className="fs-6" value="descending year">Gads (no jaunākās)</option>
                <option className="fs-6" value="ascending year">Gads (no vecākās)</option>
            </select>
        </div>
    );
}

export default SortingList;