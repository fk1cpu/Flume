import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../utils/theme';

interface CategoryPillProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export const CategoryPill = memo(({ label, isSelected, onPress }: CategoryPillProps) => {
  return (
    <TouchableOpacity
      style={[styles.pill, isSelected && styles.pillSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, isSelected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
});

CategoryPill.displayName = 'CategoryPill';

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  pillSelected: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  labelSelected: {
    color: COLORS.background,
    fontWeight: '600',
  },
});

export default CategoryPill;
