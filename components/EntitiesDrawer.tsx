"use client";

import React from "react";
import { User, Building2, MapPin, Calendar, Hash, Tag } from "lucide-react";
import { Entity } from "@/types/factcheck";

interface EntitiesDrawerProps {
  entities: Entity[];
}

export default function EntitiesDrawer({ entities }: EntitiesDrawerProps) {
  if (!entities || entities.length === 0) return null;

  const getEntityIcon = (type: Entity["type"]) => {
    switch (type) {
      case "PERSON":
        return User;
      case "ORGANIZATION":
        return Building2;
      case "LOCATION":
        return MapPin;
      case "DATE":
        return Calendar;
      case "NUMERIC_METRIC":
      default:
        return Hash;
    }
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-7 shadow-xl">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
        <span className="p-1.5 rounded-lg bg-slate-800 text-emerald-400">
          <Tag className="w-4 h-4" />
        </span>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Extracted Entities & Subject Nodes
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Key persons, institutional bodies, dates, and quantitative anchors isolated during semantic deconstruction
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {entities.map((entity, idx) => {
          const Icon = getEntityIcon(entity.type);
          return (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <Icon className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-200">{entity.name}</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                {entity.type.toLowerCase()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
