import { PropsTypes } from "../../core/animation/engine";
import { AnimationProperty } from "../../core/animation/interfaces";

export interface AnimationDefinition {
    previous: DefinitionItem;
    current: DefinitionItem;
}

export interface DefinitionItem {
    left: AnimationProperty<PropsTypes>;
    right: AnimationProperty<PropsTypes>
}

export interface CuiAnimationsDefinition {
    [id: string]: AnimationDefinition;
}

export const SWIPE_ANIMATIONS_DEFINITIONS: CuiAnimationsDefinition = {
    "slide": {
        current: {
            left: {
                transform: {
                    translateX: {
                        from: 0,
                        to: -100,
                        unit: "%"
                    }
                }
            },
            right: {
                transform: {
                    translateX: {
                        from: 0,
                        to: 100,
                        unit: "%"
                    }
                }
            }
        },
        previous: {
            left: {
                transform: {
                    translateX: {
                        from: 100,
                        to: 0,
                        unit: "%"
                    }
                }
            },
            right: {
                transform: {
                    translateX: {
                        from: -100,
                        to: 0,
                        unit: "%"
                    }
                }
            }
        }
    },
    fade: {
        current: {
            left: {
                opacity: {
                    from: 1,
                    to: 0
                }
            },
            right: {
                opacity: {
                    from: 1,
                    to: 0
                }
            }
        },
        previous: {
            left: {
                opacity: {
                    from: 0,
                    to: 1
                }
            },
            right: {
                opacity: {
                    from: 0,
                    to: 1
                }
            }
        }
    },
    push: {
        current: {
            left: {
                transform: {
                    translateX: {
                        from: 0,
                        to: -10,
                        unit: "%"
                    }
                }
            },
            right: {
                transform: {
                    translateX: {
                        from: 0,
                        to: 10,
                        unit: "%"
                    }
                }
            }
        },
        previous: {
            left: {
                transform: {
                    translateX: {
                        from: 100,
                        to: 0,
                        unit: "%"
                    }
                }
            },
            right: {
                transform: {
                    translateX: {
                        from: -100,
                        to: 0,
                        unit: "%"
                    }
                }
            }
        }
    }
}
