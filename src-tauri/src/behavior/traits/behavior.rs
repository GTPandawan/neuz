use slog::Logger;
use tauri::Window;

use crate::{
    image_analyzer::ImageAnalyzer,
    ipc::{BotConfig, FrontendInfo},
    movement::MovementAccessor,
};

pub trait Behavior<'a> {
    /// Runs on initialization
    fn new(
        logger: &'a Logger,
        movement_accessor: &'a MovementAccessor,
        window: &'a Window
    ) -> Self;

    /// Runs on activation
    fn start(&mut self, config: &BotConfig);

    /// Runs on config change
    fn update(&mut self, config: &BotConfig);

    /// Runs on deactivation
    fn stop(&mut self, config: &BotConfig);

    /// Runs every frame
    fn run_iteration(
        &mut self,
        frontend_info: &mut FrontendInfo,
        config: &BotConfig,
        analyzer: &mut ImageAnalyzer,
    );
}
