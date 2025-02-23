Detailed Description of TimerToolkit (Flutter Version)

Overview:

TimerToolkit is a versatile timer application built with Flutter, designed for mobile (currently tested on Android and Windows). It features three distinct timer types—Random Timer, Standard Timer, and Tabata Timer—accessible via a tabbed interface. Users can customize settings like theme colors and visual countdowns, with persistent storage across app restarts. The app supports background notifications for timers and is styled with a polished, user-friendly UI.
Pages

    Home Screen (lib/main.dart - HomeScreen class):
        Purpose: Main entry point with navigation to the three timer screens.
        Layout:
            AppBar with title "TimerToolkit" and a settings icon button (navigates to SettingsScreen).
            BottomNavigationBar with three tabs:
                "Random" (icon: Icons.shuffle, leads to RandomTimerScreen).
                "Standard" (icon: Icons.timer, leads to StandardTimerScreen).
                "Tabata" (icon: Icons.fitness_center, leads to TabataTimerScreen).
            Body displays the selected timer screen.
        Styling:
            Nav bar uses selectedItemColor from the primary theme color, unselectedItemColor: Colors.grey.
    Random Timer Screen (lib/features/random_timer/screens/random_timer_screen.dart):
        Purpose: A timer with random durations within a user-set range, supporting looping and rounds.
        Components:
            TimerDisplay: Shows remaining seconds, progress bar (toggleable), and round info (e.g., "Round 1/5").
            Two InputFields: "Min (s)" and "Max (s)" (width 100) for random range.
            One InputField: "Rounds (0 = endless)" (width 175) for number of cycles.
            ToggleRow: "Loop Mode" toggle to enable/disable looping.
            ControlButtons: Circular play, pause, stop buttons.
            SoundPickerButton: Placeholder for sound selection (currently shows a snackbar).
        Layout: Centered in a ConstrainedBox (maxWidth: 600), wrapped in SingleChildScrollView with 24.0 padding/spacing.
        Functionality:
            Generates random countdowns between min/max, loops if enabled, stops after set rounds or endlessly if 0.
            Background notification: "Random Timer Running: Round X/Y: Zs".
    Standard Timer Screen (lib/features/standard_timer/screens/standard_timer_screen.dart):
        Purpose: A simple countdown timer with a fixed user-set duration.
        Components:
            TimerDisplay: Shows remaining seconds and progress bar (no rounds).
            One InputField: "Duration (s)" (width 175) for countdown length.
            ControlButtons: Play, pause, stop.
            SoundPickerButton: Placeholder.
        Layout: Same as Random Timer—centered, scrollable, 24.0 spacing.
        Functionality:
            Counts down from the set duration, stops when done.
            Background notification: "Standard Timer Running: Xs remaining".
    Tabata Timer Screen (lib/features/tabata_timer/screens/tabata_timer_screen.dart):
        Purpose: An interval timer with work/rest cycles, optional warm-up/cool-down.
        Components:
            TimerDisplay: Shows remaining seconds, progress bar, and phase info (e.g., "Warm-up", "Round X/Y").
            Five InputFields:
                "Rounds" (width 100), "Work (s)" (width 100), "Rest (s)" (width 100), "Warm-up (s)" (width 100), "Cool-down (s)" (width 175).
            ControlButtons: Play, pause, stop.
            SoundPickerButton: Placeholder.
        Layout: Same centered/scrollable structure, with phase-specific background colors (applied via Container).
        Functionality:
            Phases: Warm-up → Work → Rest (repeats for rounds) → Cool-down → Done.
            Background colors: Work (green[500]), Rest (blue[500]), Warm-up (secondaryColor[500]), Cool-down (purple[500]), 20% opacity when running, transparent when idle.
            Background notification: "Tabata Timer Running: Phase: Xs (Round X/Y)".
    Settings Screen (lib/features/settings/screens/settings_screen.dart):
        Purpose: Customize app settings with persistence.
        Components:
            ToggleRow: "Show Visual Countdown" (toggles progress bar visibility).
            ToggleRow: "Dark Mode" (switches theme).
            Primary Color picker: Circular swatches (blue, indigo, etc.), default Colors.blue (navy-ish).
            Secondary Color picker: Circular swatches (amber, lime, etc.), default Colors.amber (gold-ish).
            Sample Buttons: Three circular buttons (play: primary[700], pause: disabled grey, stop: secondary[700]).
        Layout: Scrollable column with 16.0 padding, 20.0 spacing between sections.
        Functionality:
            Saves settings via shared_preferences (persists across restarts).
            Color pickers update the app’s theme dynamically.

Theming

    File: lib/core/themes.dart
    Structure: Dynamic AppThemes.getTheme function taking primaryColor, secondaryColor, and isDarkMode.
    Light Mode:
        Background: grey[100].
        Primary: User-selected (default Colors.blue), used for buttons, nav, switches.
        Text: black87 (bold), black54.
        Inputs: White fill, primary-colored focus border.
        Buttons: primary[700] active, grey[300] disabled, white icons.
    Dark Mode:
        Background: grey[850].
        Primary: Lighter shade (primary[300]) for active elements.
        Text: white (bold), white70.
        Inputs: grey[900] fill, primary[300] focus border.
        Buttons: primary[600] active, grey[700] disabled, white icons.
    Components:
        TimerDisplay: Animated progress bar (primary color), shadow, toggleable via settings.
        ControlButtons: Circular, primary[700]/[300] for play/pause, secondary[700] for stop, grey when disabled.

Functionality

    Timer Logic:
        Random: Random duration between min/max, loops if enabled, stops after rounds (0 = endless).
        Standard: Fixed duration countdown.
        Tabata: Sequential phases (warm-up, work/rest cycles, cool-down).
        All timers play a beep sound (beep.mp3) on completion.
    Background Running:
        Uses flutter_local_notifications to show persistent notifications (ID 0) when active, updating each second, cleared on pause/reset/end.
        Notification text reflects timer type and state (e.g., "Random Timer Running: Round 1/5: 10s").
    State Management: Riverpod providers (randomTimerProvider, standardTimerProvider, tabataTimerProvider, settingsProvider) handle timer states and settings.
    Persistence: shared_preferences saves settings (visual countdown, dark mode, colors) across restarts.

UI/UX Details

    Layout: All screens use a max-width of 600, centered, with 24.0 padding/spacing for consistency.
    Components: Reusable widgets in lib/core/components/ (TimerDisplay, InputField, ControlButtons, ToggleRow, SoundPickerButton).
    Polish:
        Animated progress bar in TimerDisplay.
        Circular buttons with icon feedback.
        Tabata’s phase-specific background colors.
    Theming: User-customizable via Settings, with sample buttons previewing primary/secondary colors.

Key Files

    Main: lib/main.dart
    Screens: lib/features/[random/standard/tabata]_timer/screens/[name]_screen.dart, lib/features/settings/screens/settings_screen.dart
    Providers: lib/features/[random/standard/tabata]_timer/providers/[name]_provider.dart, lib/features/settings/providers/settings_provider.dart
    Theme: lib/core/themes.dart
    Components: lib/core/components/*.dart