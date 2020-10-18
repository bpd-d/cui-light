import { AnimationDefinition } from "./interfaces";

export const SlideAnimationDefnition: AnimationDefinition = {
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
}


export const FadeAnimationDefnition: AnimationDefinition = {
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
}

export const PushAnimationDefnition: AnimationDefinition = {
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