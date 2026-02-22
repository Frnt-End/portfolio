import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ColorSlider from "../components/ColorSlider";

describe("ColorSlider", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(
        <ColorSlider
          mode="H"
          value={180}
          onChange={mockOnChange}
          min={0}
          max={360}
          hue={180}
          saturation={100}
          brightness={50}
        />
      );
      expect(screen.getByRole("slider")).toBeInTheDocument();
    });

    it("renders in hue mode with correct initial value", () => {
      render(
        <ColorSlider
          mode="H"
          value={180}
          onChange={mockOnChange}
          min={0}
          max={360}
          hue={180}
          saturation={100}
          brightness={50}
        />
      );
      const slider = screen.getByRole("slider");
      expect(slider).toHaveValue("180");
    });

    it("renders in saturation mode", () => {
      render(
        <ColorSlider
          mode="S"
          value={50}
          onChange={mockOnChange}
          min={0}
          max={100}
          hue={180}
          saturation={100}
          brightness={50}
        />
      );
      const slider = screen.getByRole("slider");
      expect(slider).toHaveValue("50");
    });

    it("renders in brightness mode", () => {
      render(
        <ColorSlider
          mode="B"
          value={50}
          onChange={mockOnChange}
          min={0}
          max={100}
          hue={180}
          saturation={100}
          brightness={50}
        />
      );
      const slider = screen.getByRole("slider");
      expect(slider).toHaveValue("50");
    });
  });

  describe("User Interaction", () => {
    it("calls onChange when slider value changes", async () => {
      render(
        <ColorSlider
          mode="H"
          value={180}
          onChange={mockOnChange}
          min={0}
          max={360}
          hue={180}
          saturation={100}
          brightness={50}
        />
      );
      const slider = screen.getByRole("slider");

      fireEvent.change(slider, { target: { value: 90 } });

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith(90);
      });
    });

    it("handles decimal precision in value changes", async () => {
      render(
        <ColorSlider
          mode="S"
          value={50}
          onChange={mockOnChange}
          min={0}
          max={100}
          hue={180}
          saturation={100}
          brightness={50}
        />
      );
      const slider = screen.getByRole("slider");

      fireEvent.change(slider, { target: { value: 75.5 } });

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith(75.5);
      });
    });
  });

  describe("Color Calculation", () => {
    it("has correct track background for hue mode", () => {
      const { container } = render(
        <ColorSlider
          mode="H"
          value={180}
          onChange={mockOnChange}
          min={0}
          max={360}
          hue={180}
          saturation={100}
          brightness={50}
        />
      );
      const track = container.querySelector(".pointer-events-none");
      expect(track).toHaveStyle({
        background:
          "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)"
      });
    });

    it("has correct track background for saturation mode", () => {
      const { container } = render(
        <ColorSlider
          mode="S"
          value={50}
          onChange={mockOnChange}
          min={0}
          max={100}
          hue={180}
          saturation={100}
          brightness={50}
        />
      );
      const track = container.querySelector(".pointer-events-none");
      expect(track).toHaveStyle({
        background:
          "linear-gradient(to right, hsl(180, 0%, 50%), hsl(180, 100%, 50%))"
      });
    });

    it("has correct track background for brightness mode", () => {
      const { container } = render(
        <ColorSlider
          mode="B"
          value={50}
          onChange={mockOnChange}
          min={0}
          max={100}
          hue={180}
          saturation={100}
          brightness={50}
        />
      );
      const track = container.querySelector(".pointer-events-none");
      expect(track).toHaveStyle({
        background:
          "linear-gradient(to right, hsl(180, 100%, 0%), hsl(180, 100%, 100%))"
      });
    });
  });

  describe("Performance", () => {
    it("renders quickly (under 16ms for 60fps)", () => {
      const start = performance.now();
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(
          <ColorSlider
            mode="H"
            value={180}
            onChange={mockOnChange}
            min={0}
            max={360}
            hue={180}
            saturation={100}
            brightness={50}
          />
        );
        unmount();
      }
      const end = performance.now();
      const avgTime = (end - start) / 10;

      expect(avgTime).toBeLessThan(16);
    });

    it("handles rapid value changes efficiently", async () => {
      const { container } = render(
        <ColorSlider
          mode="H"
          value={180}
          onChange={mockOnChange}
          min={0}
          max={360}
          hue={180}
          saturation={100}
          brightness={50}
        />
      );
      const slider = screen.getByRole("slider");

      const start = performance.now();

      for (let i = 0; i < 50; i++) {
        fireEvent.change(slider, { target: { value: Math.random() * 360 } });
      }

      const end = performance.now();

      expect(end - start).toBeLessThan(100);
      expect(mockOnChange).toHaveBeenCalledTimes(50);
    });
  });
});
