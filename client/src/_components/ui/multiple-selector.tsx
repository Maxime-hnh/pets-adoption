"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/_lib/cn';

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface OptionGroup {
  label: string;
  options: Option[];
}

export interface MultipleSelectorProps {
  options?: Option[];
  groups?: OptionGroup[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxSelected?: number;
  searchable?: boolean;
  clearable?: boolean;
  closeOnSelect?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  labelClassName?: string;
  badgeClassName?: string;
  dropdownClassName?: string;
  label?: string;
}

const MultipleSelector = React.forwardRef<HTMLDivElement, MultipleSelectorProps>(
  (
    {
      options = [],
      groups = [],
      value = [],
      onChange,
      placeholder = "Sélectionner des options...",
      disabled = false,
      className,
      maxSelected,
      searchable = true,
      clearable = true,
      closeOnSelect = false,
      loading = false,
      emptyMessage = "Aucune option trouvée",
      labelClassName,
      badgeClassName,
      dropdownClassName,
      label,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Aplatir toutes les options (groupées et non groupées)
    const allOptions = React.useMemo(() => {
      const flatOptions = [...options];
      groups.forEach(group => {
        flatOptions.push(...group.options);
      });
      return flatOptions;
    }, [options, groups]);

    // Filtrer les options basées sur la recherche
    const filteredData = React.useMemo(() => {
      if (!searchable || !searchTerm) {
        return {
          options,
          groups
        };
      }
      
      const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const filteredGroups = groups.map(group => ({
        ...group,
        options: group.options.filter(option =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(group => group.options.length > 0);
      
      return {
        options: filteredOptions,
        groups: filteredGroups
      };
    }, [options, groups, searchTerm, searchable]);

    // Options disponibles (non sélectionnées) pour la navigation clavier
    const availableOptions = React.useMemo(() => {
      const flatFiltered = [...filteredData.options];
      filteredData.groups.forEach(group => {
        flatFiltered.push(...group.options);
      });
      return flatFiltered.filter(option => !value.includes(option.value));
    }, [filteredData, value]);

    // Gérer la sélection d'une option
    const handleSelect = useCallback((optionValue: string) => {
      if (disabled) return;
      
      const newValue = value.includes(optionValue)
        ? value.filter(v => v !== optionValue)
        : maxSelected && value.length >= maxSelected
        ? value
        : [...value, optionValue];
      
      onChange?.(newValue);
      
      if (closeOnSelect) {
        setIsOpen(false);
      }
      
      setSearchTerm("");
      setFocusedIndex(-1);
    }, [value, onChange, disabled, maxSelected, closeOnSelect]);

    // Supprimer une option sélectionnée
    const handleRemove = useCallback((optionValue: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (disabled) return;
      
      const newValue = value.filter(v => v !== optionValue);
      onChange?.(newValue);
    }, [value, onChange, disabled]);

    // Vider toutes les sélections
    const handleClearAll = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      
      onChange?.([]);
      setSearchTerm("");
      setFocusedIndex(-1);
    }, [onChange, disabled]);

    // Gérer les touches du clavier
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (disabled) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex(prev => 
              prev < availableOptions.length - 1 ? prev + 1 : 0
            );
          }
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            setFocusedIndex(prev => 
              prev > 0 ? prev - 1 : availableOptions.length - 1
            );
          }
          break;
          
        case 'Enter':
          e.preventDefault();
          if (isOpen && focusedIndex >= 0 && availableOptions[focusedIndex]) {
            handleSelect(availableOptions[focusedIndex].value);
          } else if (!isOpen) {
            setIsOpen(true);
          }
          break;
          
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
          
        case 'Backspace':
          if (searchTerm === "" && value.length > 0) {
            handleRemove(value[value.length - 1]);
          }
          break;
      }
    }, [disabled, isOpen, focusedIndex, availableOptions, handleSelect, searchTerm, value, handleRemove]);

    // Fermer le dropdown quand on clique à l'extérieur
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll vers l'option focusée
    useEffect(() => {
      if (focusedIndex >= 0 && dropdownRef.current) {
        const focusedElement = dropdownRef.current.children[focusedIndex] as HTMLElement;
        if (focusedElement) {
          focusedElement.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [focusedIndex]);

    // Obtenir le label d'une option par sa valeur
    const getOptionLabel = (optionValue: string) => {
      return allOptions.find(option => option.value === optionValue)?.label || optionValue;
    };

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full",
          className
        )}
      >
        {/* Label optionnel */}
        {label && (
          <label className={cn(
            "block text-sm font-medium text-gray-700 mb-2",
            labelClassName
          )}>
            {label}
          </label>
        )}
        <div
          ref={ref}
          className={cn(
            "flex min-h-10 w-full flex-wrap items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "focus-within:ring-1 focus-within:ring-indigo-500",
            disabled && "cursor-not-allowed opacity-50",
            isOpen && "ring-1 ring-indigo-500"
          )}
          onClick={() => {
            if (!disabled) {
              setIsOpen(true);
              inputRef.current?.focus();
            }
          }}
        >
          {/* Badges des options sélectionnées */}
          {value.map((selectedValue) => {
            const option = allOptions.find(opt => opt.value === selectedValue);
            if (!option) return null;
            
            return (
              <div
                key={selectedValue}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground",
                  "hover:bg-secondary/80 transition-colors",
                  badgeClassName
                )}
              >
                <span>{option.label}</span>
                <button
                  type="button"
                  className="ml-1 rounded-sm opacity-70 hover:opacity-100 focus:opacity-100 focus:outline-none"
                  onClick={(e) => handleRemove(selectedValue, e)}
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
          
          {/* Input de recherche */}
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={value.length === 0 ? placeholder : ""}
            disabled={disabled || (maxSelected ? value.length >= maxSelected : false)}
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground w-full"
          />
          
          {/* Boutons d'action */}
          <div className="flex items-center gap-1">
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-muted-foreground border-t-transparent" />
            )}
            
            {clearable && value.length > 0 && !disabled && (
              <button
                type="button"
                onClick={handleClearAll}
                className="rounded-sm opacity-70 hover:opacity-100 focus:opacity-100 focus:outline-none p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            <ChevronDown 
              className={cn(
                "h-4 w-4 opacity-50 transition-transform duration-200",
                isOpen && "rotate-180"
              )} 
            />
          </div>
        </div>
        
        {/* Dropdown des options */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className={cn(
              "absolute z-50 w-full mt-2 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md",
              "animate-in fade-in-0 zoom-in-95",
              dropdownClassName
            )}
          >
            {availableOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                {loading ? "Chargement..." : emptyMessage}
              </div>
            ) : (
              <>
                {/* Options non groupées */}
                {filteredData.options.filter(option => !value.includes(option.value)).map((option, index) => (
                  <div
                    key={option.value}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 text-sm cursor-pointer",
                      "hover:bg-accent hover:text-accent-foreground",
                      focusedIndex === index && "bg-accent text-accent-foreground",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                  >
                    <span>{option.label}</span>
                    {value.includes(option.value) && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                ))}
                
                {/* Options groupées */}
                {filteredData.groups.map((group, groupIndex) => {
                  const groupOptions = group.options.filter(option => !value.includes(option.value));
                  if (groupOptions.length === 0) return null;
                  
                  const baseIndex = filteredData.options.filter(option => !value.includes(option.value)).length;
                  let currentIndex = baseIndex;
                  
                  // Calculer l'index de base pour ce groupe
                  for (let i = 0; i < groupIndex; i++) {
                    currentIndex += filteredData.groups[i].options.filter(option => !value.includes(option.value)).length;
                  }
                  
                  return (
                    <div key={group.label}>
                      {/* Sous-titre du groupe */}
                      <div className="flex items-center px-3 py-2 text-xs font-semibold text-muted-foreground">
                        <span className="pr-3">{group.label}</span>
                        <div className="flex-1 h-px bg-border"></div>
                      </div>
                      
                      {/* Options du groupe */}
                      {groupOptions.map((option, optionIndex) => {
                        const absoluteIndex = currentIndex + optionIndex;
                        return (
                          <div
                            key={option.value}
                            className={cn(
                              "flex items-center justify-between px-3 py-2 text-sm cursor-pointer pl-6",
                              "hover:bg-accent hover:text-accent-foreground",
                              focusedIndex === absoluteIndex && "bg-accent text-accent-foreground",
                              option.disabled && "opacity-50 cursor-not-allowed"
                            )}
                            onClick={() => !option.disabled && handleSelect(option.value)}
                          >
                            <span>{option.label}</span>
                            {value.includes(option.value) && (
                              <Check className="h-4 w-4" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    );
  }
);

MultipleSelector.displayName = "MultipleSelector";

export { MultipleSelector };